import React from "react";
import ColorBox from "./context/ColorBox";
import {ColorProvider} from "./context/color";
import SelectColors from "./context/SelectColors";

const App = () => {
  return (
      <ColorProvider>
          <div>
              <SelectColors />
              <ColorBox />
          </div>
      </ColorProvider>
  );
};

export default App;
