import { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap, Controls } from "react-flow-renderer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styles from "./Default.module.css";

function Default() {
  const [node, setNode] = useState();

  const elements = [
    {
      id: "one",
      node_id: 0,
      data: {
        label: (
          <div
            className={styles.node_container}
            onClick={() => {
              const arr = [...node];
              arr[0].one.showInput = true;
              setNode(arr);
            }}
          >
            <div>
              {node && node[0].one.showInput ? (
                <div className={styles.node_text_container}>
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const arr = [...node];
                        arr[0].one.showInput = false;
                        setNode(arr);
                      }
                    }}
                    value={node ? node[0].one.inputValue : ""}
                    fullWidth
                  />
                  &nbsp;
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </div>
              ) : (
                <div className={styles.node_text_container}>
                  <p>
                    1.{" "}
                    {node && node[0].one.inputValue !== ""
                      ? node[0].one.inputValue
                      : "Are you married ?"}
                  </p>
                  <span className={styles.question_badge}>YES/NO</span>
                </div>
              )}
            </div>
          </div>
        ),
      },
      position: { x: 200, y: 50 },
      style: {
        width: 500,
        border: "none",
        borderRadius: 10,
        padding: "1rem 0rem",
      },
      nodeType: "default",
    },
    {
      id: "one-one",
      data: { label: "if ans === yes" },
      position: { x: 50, y: 200 },
      style: {
        width: 300,
        border: "none",
        borderRadius: 10,
        padding: "1rem 0rem",
      },
      nodeType: "if-else",
    },
    {
      id: "one-two",
      data: { label: "if ans === no" },
      position: { x: 550, y: 200 },
      style: {
        width: 300,
        border: "none",
        borderRadius: 10,
        padding: "1rem 0rem",
      },
    },
    {
      id: "two-one",
      data: {
        label: "2.1. What is the name of your spouse?",
      },
      position: { x: 50, y: 300 },
      style: {
        width: 300,
        border: "none",
        borderRadius: 10,
        padding: "1rem 0rem",
      },
    },
    {
      id: "two-two",
      data: { label: "2.2. What is your DOB?" },
      position: { x: 550, y: 300 },
      style: {
        width: 300,
        border: "none",
        borderRadius: 10,
        padding: "1rem 0rem",
      },
    },
    {
      id: "three",
      node_id: 5,
      data: {
        label: (
          <div
            className={styles.node_container}
            onClick={() => {
              const arr = [...node];
              arr[5].three.showInput = true;
              setNode(arr);
            }}
          >
            <div>
              {node && node[5].three.showInput ? (
                <div className={styles.node_text_container}>
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const arr = [...node];
                        arr[5].three.showInput = false;
                        setNode(arr);
                      }
                    }}
                    value={node ? node[5].three.inputValue : ""}
                    fullWidth
                  />
                  &nbsp;
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </div>
              ) : (
                <div className={styles.node_text_container}>
                  <p>
                    2.{" "}
                    {node && node[5].three.inputValue !== ""
                      ? node[5].three.inputValue
                      : "Enter your PAN ID"}
                  </p>
                  <span className={styles.question_badge}>SHORT TEXT</span>
                </div>
              )}
            </div>
          </div>
        ),
      },
      position: { x: 200, y: 400 },
      style: {
        width: 500,
        border: "none",
        borderRadius: 10,
        padding: "1rem 0rem",
      },
    },
    {
      id: "e1-1.2",
      source: "one",
      target: "one-one",
      animated: false,
    },
    {
      id: "e1-1.1",
      source: "one",
      target: "one-two",
      animated: false,
    },
    {
      id: "e1.1-2.1",
      source: "one-one",
      target: "two-one",
      animated: false,
    },
    {
      id: "e1.2-2.2",
      source: "one-two",
      target: "two-two",
      animated: false,
    },
    {
      id: "e2.1-3",
      source: "two-one",
      target: "three",
      animated: false,
    },
    {
      id: "e2.2-3",
      source: "two-two",
      target: "three",
      animated: false,
    },
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

  const [customMinimap, setCustomMinimap] = useState(false);

  return (
    <div className={styles.container}>
      <ReactFlow elements={elements} defaultZoom={0.8}>
        <Background variant="lines" color="#E5E5E5" gap={1} size={0.5} />
        <MiniMap
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.nodeType === "default") return "#0041d0";
            if (n.nodeType === "if-else") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          nodeBorderRadius={customMinimap ? 20 : 0}
          style={{ background: customMinimap ? "#96ACAC" : "#fff" }}
        />
        <Controls />
        <div className={styles.minimap_buttons}>
          <Button
            onClick={() => setCustomMinimap(!customMinimap)}
            size="small"
            variant="contained"
          >
            Custom Minimap
          </Button>
        </div>
      </ReactFlow>
    </div>
  );
}

export default Default;
