import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import ImageColorChanger from "./ImageColorChanger";
//import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

root.render(
  <StrictMode>
    {/* <ChartComponent />
    <PdfGenerator /> */}
    
    <ImageColorChanger />
    
    
  </StrictMode>
  //document.getElementById('root')
);
