import Pi from "./Pi";
import React from "react";
import { Global } from "@emotion/react";
const App2 = () => {
  return (
    <Global
      styles={() => ({
        body: {
          // needed in order to remove background content shifting when modals are opened in a page with scroll
          overflowY: "visible !important",
          margin: 0,
          fontFamily: "'Work Sans', sans-serif",
          fontFeatureSettings: "'lnum'",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      })}
    >
      <Pi />
    </Global>
  );
};
export default App2;
