import "./App.css";

import { useState } from "react";
import Button from "@mui/material/Button";

import { GlobalContext } from "./GlobalContext";

import Default from "./components/Default/Default.component";
import IfElse from "./components/IfElse/IfElse.component";

const App = () => {
  const [component, setComponent] = useState(1);

  const [node, setNode] = useState([]);
  return (
    <GlobalContext.Provider value={{ node, setNode }}>
      <h1 style={{ marginTop: "5rem" }}> &nbsp; NODE BOX </h1>
      <div className="buttons-group">
        <Button onClick={() => setComponent(0)} variant="outlined">
          Default
        </Button>
        <Button onClick={() => setComponent(1)} variant="outlined">
          If-Else
        </Button>
      </div>
      {component === 0 && <Default />}
      {component === 1 && <IfElse />}
    </GlobalContext.Provider>
  );
};

export default App;
