import { useState } from "react";

import Screen1 from "./Screen1.component";
import Screen2 from "./Screen2.component";

const DualScreen = () => {
  const [showSecondaryMap, setSecondaryMap] = useState(true);
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
      {showSecondaryMap && <Screen2 setSecondaryMap={setSecondaryMap} />}
    </div>
  );
};

export default DualScreen;
