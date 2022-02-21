import "./App.css";

import ReactFlow from "react-flow-renderer";

const elements = [
  {
    id: "1",
    type: "input",
    data: { label: <div> 1. Are you married ? </div> },
    position: { x: 200, y: 5 },
    style: {
      width: 300,
    },
  },
  {
    id: "1.1",
    data: { label: "if ans === yes" },
    position: { x: 100, y: 100 },
    style: {
      width: 200,
    },
  },
  {
    id: "1.2",
    data: { label: "if ans === no" },
    position: { x: 400, y: 100 },
    style: {
      width: 200,
    },
  },
  {
    id: "2.1",
    data: {
      label: "2.1. What is the name of your spouse?",
    },
    position: { x: 100, y: 200 },
    style: {
      width: 200,
    },
  },
  {
    id: "2.2",
    data: { label: "2.2. What is your DOB?" },
    position: { x: 400, y: 200 },
    style: {
      width: 200,
    },
  },
  {
    id: "3",
    data: { label: "3. What is your PAN number?" },
    position: { x: 200, y: 300 },
    style: {
      width: 300,
    },
  },
  { id: "e1-1.2", source: "1", target: "1.1", animated: false },
  { id: "e1-1.1", source: "1", target: "1.2", animated: false },
  { id: "e1.1-2.1", source: "1.1", target: "2.1", animated: false },
  { id: "e1.2-2.2", source: "1.2", target: "2.2", animated: false },
  { id: "e2.1-3", source: "2.1", target: "3", animated: false },
  { id: "e2.2-3", source: "2.2", target: "3", animated: false },
];

function App() {
  return (
    <div style={{ height: 800 }}>
      <ReactFlow elements={elements} />
    </div>
  );
}

export default App;
