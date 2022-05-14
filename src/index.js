import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Global } from "@emotion/react";
import Pi from "./Pi";
ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={() => ({
        body: {
          overflowY: "visible !important",
          margin: 0,
          fontFamily: "'Work Sans', sans-serif",
          fontFeatureSettings: "'lnum'",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      })}
    ></Global>
    <Pi></Pi>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
