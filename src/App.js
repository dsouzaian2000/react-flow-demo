import "./App.css";

import { useState } from "react";
import Button from "@mui/material/Button";

import { GlobalContext } from "./GlobalContext";

import Default from "./components/Default/Default.component";
import IfElse from "./components/IfElse/IfElse.component";
import DualScreen from "./components/DualScreen/DualScreen.component";

const data = [
  {
    id: "1",
    qNo: 1,
    question: "Are you married ?",
    qType: "YES/NO",
    position: { x: 200, y: 50 },
    type: "default",
  },
  {
    id: "2",
    qNo: 2,
    question: "What is the name of your spouse ?",
    qType: "SHORT TEXT",
    position: { x: 200, y: 200 },
    type: "default",
  },
  {
    id: "3",
    qNo: 3,
    question: "Enter your DOB.",
    qType: "DATE",
    position: { x: 200, y: 350 },
    type: "default",
  },
  {
    id: "4",
    qNo: 4,
    question: "What is your PAN number ?",
    qType: "SHORT TEXT",
    position: { x: 200, y: 500 },
    type: "default",
  },
  {
    id: "5",
    qNo: 5,
    question: "What is your number ?",
    qType: "SHORT TEXT",
    position: { x: 200, y: 650 },
    type: "default",
  },
  {
    id: "5",
    qNo: 5,
    question: "What is your number ?",
    qType: "SHORT TEXT",
    position: { x: 200, y: 650 },
    type: "default",
  },
  {
    id: "6",
    qNo: 6,
    question: "Enter your address",
    qType: "SHORT TEXT",
    position: { x: 200, y: 800 },
    type: "default",
  },

  {
    id: "1-2",
    source: "1",
    target: "2",
    eType: "default",
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
  },
  {
    id: "3-4",
    source: "3",
    target: "4",
  },
  {
    id: "4-5",
    source: "4",
    target: "5",
  },
  {
    id: "5-6",
    source: "5",
    target: "6",
  },
];

const App = () => {
  const [component, setComponent] = useState(2);

  //state for flow
  const [nodeElements, setNodeElements] = useState([]);
  //state for node input management
  const [node, setNode] = useState([]);
  //state for data in flow
  const [nodeData, setNodeData] = useState(data);

  //state for adjusting width on zoom
  const [nodeWidth, setNodeWidth] = useState(250);

  return (
    <GlobalContext.Provider
      value={{
        node,
        setNode,
        nodeData,
        setNodeData,
        nodeElements,
        setNodeElements,
        nodeWidth,
        setNodeWidth,
      }}
    >
      {component === 0 && <Default />}
      {component === 1 && <IfElse />}
      {component === 2 && <DualScreen />}

      {component !== 2 && (
        <>
          <h1 style={{ marginTop: "0rem" }}> &nbsp; NODE BOX </h1>
          <div className="buttons-group">
            <Button onClick={() => setComponent(0)} variant="outlined">
              Default
            </Button>
            <Button onClick={() => setComponent(1)} variant="outlined">
              If-Else
            </Button>
          </div>
        </>
      )}
    </GlobalContext.Provider>
  );
};

export default App;
