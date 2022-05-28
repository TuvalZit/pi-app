import React from "react";
import ReactDOM from "react-dom";
import { Global } from "@emotion/react";
import Pi from "./Pi";
import { Provider } from "react-redux";
import store from "./Redux/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
