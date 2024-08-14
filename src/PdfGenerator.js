import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";


const PdfGenerator = () => {
  const contentRef = useRef(null);

  const generatePdf = () => {
    const element = contentRef.current;

    html2canvas(element, { scale: 2 }) // Set the scale value to adjust DPI
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('receipt.pdf');
      });
    //html2pdf().from(element).set({ html2canvas: { dpi: 900 } }).save();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };

  return (
    <div>
      <h1>PDF Generator</h1>
      <form onSubmit={handleSubmit}>
        <div ref={contentRef}>
          <h2>Receipt</h2>
          <p>Item 1: $10</p>
          <p>Item 2: $20</p>
          <p>Total: $30</p>
        </div>
        <button onClick={generatePdf}>Generate PDF</button>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default PdfGenerator;