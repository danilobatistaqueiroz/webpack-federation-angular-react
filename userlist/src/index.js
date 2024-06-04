import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const doc = document.getElementById("buttonReact");
if(doc){
  const root = createRoot(doc);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.log('index.js react');
}