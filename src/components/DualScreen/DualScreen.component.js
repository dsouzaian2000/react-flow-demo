import { useState } from "react";

import Screen1 from "./Screen1.component";
import Screen2 from "./Screen2.component";

const DualScreen = () => {
  const [showSecondaryMap, setSecondaryMap] = useState(false);

  return (
    <div
      style={{
        width: "85%",
        textAlign: "right",
        float: "right",
      }}
    >
      <Screen1
        showSecondaryMap={showSecondaryMap}
        setSecondaryMap={setSecondaryMap}
      />
      {showSecondaryMap && <Screen2 setSecondaryMap={setSecondaryMap} />}
    </div>
  );
};

export default DualScreen;
