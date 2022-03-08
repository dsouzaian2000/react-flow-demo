import { useState } from "react";

import Screen1 from "./Screen1.component";
import Screen2 from "./Screen2.component";

const DualScreen = () => {
  const [showSecondaryMap, setSecondaryMap] = useState(true);
  const [elements2, setElements2] = useState([
    {
      id: "horizontal-1",
      sourcePosition: "right",
      type: "input",
      className: "dark-node",
      data: { label: "Input" },
      position: { x: 0, y: 80 },
    },
  ]);

  return (
    <div
      style={{
        height: 350,
        width: "85%",
        textAlign: "right",
        float: "right",
      }}
    >
      <Screen1 setSecondaryMap={setSecondaryMap} />
      {showSecondaryMap && (
        <Screen2
          elements={elements2}
          setElements={setElements2}
          setSecondaryMap={setSecondaryMap}
        />
      )}
    </div>
  );
};

export default DualScreen;
