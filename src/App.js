import "./App.css";

import { useState, useEffect, useRef } from "react";
import ReactFlow from "react-flow-renderer";
import TextField from "@mui/material/TextField";

function App() {
  const [node, setNode] = useState();
  const [refState, setRefs] = useState([]);

  const refs = useRef([]);

  const elements = [
    {
      id: "one",
      node_id: 0,
      data: {
        label: (
          <div
            style={{
              width: 300,
              height: 30,
              marginTop: "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={() => {
              const arr = [...node];
              arr[0].one.showInput = true;
              setNode(arr);
              setTimeout(() => {
                refs.current[0].focus();
              }, 100);
            }}
          >
            <div>
              {node && node[0].one.showInput ? (
                <TextField
                  autoFocus={true}
                  size="small"
                  onBlur={() => {
                    const arr = [...node];
                    arr[0].one.showInput = false;
                    setNode(arr);
                  }}
                  onChange={(e) => {
                    const arr = [...node];
                    arr[0].one.inputValue = e.target.value;
                    setNode(arr);
                  }}
                  value={node ? node[0].one.inputValue : ""}
                />
              ) : (
                <p> Are you married ? </p>
              )}
            </div>
          </div>
        ),
      },
      position: { x: 200, y: 5 },
      style: {
        width: 300,
      },
    },
    {
      id: "one-one",
      data: { label: "if ans === yes" },
      position: { x: 100, y: 100 },
      style: {
        width: 200,
      },
    },
    {
      id: "one-two",
      data: { label: "if ans === no" },
      position: { x: 400, y: 100 },
      style: {
        width: 200,
      },
    },
    {
      id: "two-one",
      data: {
        label: "2.1. What is the name of your spouse?",
      },
      position: { x: 100, y: 200 },
      style: {
        width: 200,
      },
    },
    {
      id: "two-two",
      data: { label: "2.2. What is your DOB?" },
      position: { x: 400, y: 200 },
      style: {
        width: 200,
      },
    },
    {
      id: "three",
      node_id: 5,
      data: {
        label: (
          <div
            style={{
              width: 300,
              height: 30,
              marginTop: "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={() => {
              const arr = [...node];
              arr[5].three.showInput = true;
              setNode(arr);
            }}
          >
            <div>
              {node && node[5].three.showInput ? (
                <TextField
                  autoFocus={true}
                  size="small"
                  onBlur={() => {
                    const arr = [...node];
                    arr[5].three.showInput = false;
                    setNode(arr);
                  }}
                  onChange={(e) => {
                    const arr = [...node];
                    arr[5].three.inputValue = e.target.value;
                    setNode(arr);
                  }}
                  value={node ? node[5].three.inputValue : ""}
                />
              ) : (
                <p> Enter your PAN ID. </p>
              )}
            </div>
          </div>
        ),
      },
      position: { x: 200, y: 300 },
      style: {
        width: 300,
      },
    },
    { id: "e1-1.2", source: "one", target: "one-one", animated: false },
    { id: "e1-1.1", source: "one", target: "one-two", animated: false },
    { id: "e1.1-2.1", source: "one-one", target: "two-one", animated: false },
    { id: "e1.2-2.2", source: "one-two", target: "two-two", animated: false },
    { id: "e2.1-3", source: "two-one", target: "three", animated: false },
    { id: "e2.2-3", source: "two-two", target: "three", animated: false },
  ];

  useEffect(() => {
    const arr = [];
    elements.forEach((item, index) => {
      if (!item.source) {
        const arr2 = {};
        arr2[item.id] = {
          showInput: false,
          inputValue: "",
        };
        arr.push(arr2);
      }
    });
    setNode(arr);
  }, []);

  useEffect(() => {
    if (node) refs.current = refs.current.slice(0, node.length);
  }, [node]);

  return (
    <div className="app" style={{ height: 800 }}>
      <h2> Values of Input: </h2>
      {node && node[0].one.inputValue} <br />
      {node && node[5].three.inputValue}
      <ReactFlow elements={elements} />
    </div>
  );
}

export default App;
