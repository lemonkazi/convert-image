import React, { useState, useRef,useEffect } from 'react';
import pantoneColors from './pantone_color.json'; // Import your JSON file
import "./styles.css";
const ImageColorChanger = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);
  const originalImageData = useRef(null); // Store original image data
  const [colorList, setColorList] = useState([]);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
         originalImageData.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
      img.src = e.target.result;
      setImageSrc(e.target.result); // Store the image source for later use
    };

    reader.readAsDataURL(file);
  };

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };
  
  const applyColor = (hexColor) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { r, g, b } = hexToRgb(hexColor);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const originalData = originalImageData.current.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = (originalData[i] + r) / 2;     // Red
      data[i + 1] = (originalData[i + 1] + g) / 2; // Green
      data[i + 2] = (originalData[i + 2] + b) / 2; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  };
  
  
  // only shape
  // const applyColor = (hexColor) => {
  //   if (!originalImageData.current) return; 

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   const { r, g, b } = hexToRgb(hexColor);

  //   const imageData = ctx.createImageData(originalImageData.current);
  //   const data = imageData.data;
  //   const originalData = originalImageData.current.data;

  //   for (let i = 0; i < data.length; i += 4) {
  //       // Keep the original alpha value
  //       data[i + 3] = originalData[i + 3]; 

  //       // Apply the new color only if the pixel is not fully transparent
  //       if (data[i + 3] !== 0) {
            
  //           const alpha = data[i + 3] / 255;
  //           data[i] = data[i] * (1 - alpha) + r * alpha;     
  //           data[i + 1] = data[i + 1] * (1 - alpha) + g * alpha; 
  //           data[i + 2] = data[i + 2] * (1 - alpha) + b * alpha; 
  //       }
  //   }

  //   ctx.putImageData(imageData, 0, 0);
  // };
  useEffect(() => {
    // Access the "colors" array from your JSON data
    setColorList(pantoneColors.colors); 
  }, []); // Empty dependency array means this runs once after mount


  return (
    <div className="app-container"> 
      <input type="file" id="imageUpload" onChange={handleImageUpload} />
      <label htmlFor="imageUpload" className="upload-label">
        Choose an Image
      </label>

      <div className="canvas-container">
        <canvas 
          ref={canvasRef} 
          style={{ display: imageSrc ? 'block' : 'none' }} 
        />
      </div>

      {imageSrc && (
        <div className="color-buttons">
          {colorList.map((colorItem) => (
            <button
              className="color-button"
              key={colorItem.hex}
              onClick={() => applyColor(colorItem.hex)}
              style={{ backgroundColor: colorItem.hex }} // Set button bg color
            >
              {colorItem.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

};

export default ImageColorChanger;
