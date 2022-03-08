import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "react-flow-renderer";
import Button from "@mui/material/Button";

import styles from "./DualScreen.module.css";

const DualScreen = () => {
  const [showSecondaryMap, setSecondaryMap] = React.useState(true);

  const elements1 = [
    {
      id: "horizontal-1",
      sourcePosition: "right",
      type: "input",
      className: "dark-node",
      data: { label: "Input" },
      position: { x: 0, y: 80 },
    },
    {
      id: "horizontal-2",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <div
            onClick={(e) => {
              if (e.detail === 2) setSecondaryMap(true);
            }}
          >
            {" "}
            Node 2{" "}
          </div>
        ),
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "horizontal-3",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <div
            onClick={(e) => {
              if (e.detail === 2) setSecondaryMap(true);
            }}
          >
            {" "}
            Node 3
          </div>
        ),
      },
      position: { x: 250, y: 160 },
    },
    {
      id: "horizontal-4",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Node 4" },
      position: { x: 500, y: 0 },
    },
    {
      id: "horizontal-5",
      sourcePosition: "top",
      targetPosition: "bottom",
      data: { label: "Node 5" },
      position: { x: 500, y: 100 },
    },
    {
      id: "horizontal-6",
      sourcePosition: "bottom",
      targetPosition: "top",
      data: { label: "Node 6" },
      position: { x: 500, y: 230 },
    },

    {
      id: "horizontal-e1-2",
      source: "horizontal-1",
      type: "smoothstep",
      target: "horizontal-2",
      animated: true,
    },
    {
      id: "horizontal-e1-3",
      source: "horizontal-1",
      type: "smoothstep",
      target: "horizontal-3",
      animated: true,
    },
    {
      id: "horizontal-e1-4",
      source: "horizontal-2",
      type: "smoothstep",
      target: "horizontal-4",
      label: "edge label",
    },
    {
      id: "horizontal-e3-5",
      source: "horizontal-3",
      type: "smoothstep",
      target: "horizontal-5",
      animated: true,
    },
    {
      id: "horizontal-e3-6",
      source: "horizontal-3",
      type: "smoothstep",
      target: "horizontal-6",
      animated: true,
    },
    {
      id: "horizontal-e5-7",
      source: "horizontal-5",
      type: "smoothstep",
      target: "horizontal-7",
      animated: true,
    },
    {
      id: "horizontal-e6-8",
      source: "horizontal-6",
      type: "smoothstep",
      target: "horizontal-8",
      animated: true,
    },
  ];

  const elements2 = [
    {
      id: "demo-1",
      sourcePosition: "right",
      type: "input",
      className: "dark-node",
      data: { label: "Input" },
      position: { x: 0, y: 80 },
    },
    {
      id: "demo-2",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "A Node" },
      position: { x: 250, y: 0 },
    },
    {
      id: "demo-3",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Node 3" },
      position: { x: 250, y: 160 },
    },
    {
      id: "demo-4",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Node 4" },
      position: { x: 500, y: 0 },
    },
    {
      id: "demo-5",
      sourcePosition: "top",
      targetPosition: "bottom",
      data: { label: "Node 5" },
      position: { x: 500, y: 100 },
    },
    {
      id: "demo-6",
      sourcePosition: "bottom",
      targetPosition: "top",
      data: { label: "Node 6" },
      position: { x: 500, y: 230 },
    },

    {
      id: "demo-e1-2",
      source: "demo-1",
      type: "smoothstep",
      target: "demo-2",
      animated: true,
    },
    {
      id: "demo-e1-3",
      source: "demo-1",
      type: "smoothstep",
      target: "demo-3",
      animated: true,
    },
    {
      id: "demo-e1-4",
      source: "demo-2",
      type: "smoothstep",
      target: "demo-4",
      label: "edge label",
    },
    {
      id: "demo-e3-5",
      source: "demo-3",
      type: "smoothstep",
      target: "demo-5",
      animated: true,
    },
    {
      id: "demo-e3-6",
      source: "demo-3",
      type: "smoothstep",
      target: "demo-6",
      animated: true,
    },
    {
      id: "demo-e5-7",
      source: "demo-5",
      type: "smoothstep",
      target: "demo-7",
      animated: true,
    },
    {
      id: "demo-e6-8",
      source: "demo-6",
      type: "smoothstep",
      target: "demo-8",
      animated: true,
    },
  ];

  return (
    <>
      <div style={{ height: 350 }}>
        <ReactFlowProvider>
          <ReactFlow
            elements={elements1}
            defaultZoom={0.7}
            onLoad={() => {
              setTimeout(() => {
                document.querySelector(".react-flow__controls-fitview").click();
              }, 100);
            }}
          >
            <MiniMap
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.nodeType === "default") return "#0041d0";
                if (n.nodeType === "if-else") return "#ff0072";
                return "#eee";
              }}
              nodeBorderRadius={20}
              style={{ background: "#96ACAC" }}
            />
            <Background variant="lines" color="#E5E5E5" gap={1} size={0.5} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      {showSecondaryMap && (
        <div style={{ height: 350, marginTop: "2rem" }}>
          <ReactFlowProvider>
            <ReactFlow
              elements={elements2}
              defaultZoom={0.7}
              onLoad={() => {
                setTimeout(() => {
                  document
                    .querySelectorAll(".react-flow__controls-fitview")[1]
                    .click();
                }, 100);
              }}
            >
              <MiniMap
                nodeColor={(n) => {
                  if (n.style?.background) return n.style.background;
                  if (n.nodeType === "default") return "#0041d0";
                  if (n.nodeType === "if-else") return "#ff0072";
                  return "#eee";
                }}
                nodeBorderRadius={20}
                style={{ background: "#96ACAC" }}
              />
              <div className={styles.minimap_buttons}>
                <Button
                  onClick={() => setSecondaryMap(false)}
                  size="small"
                  variant="contained"
                >
                  X
                </Button>
              </div>
              <Background variant="lines" color="#E5E5E5" gap={1} size={0.5} />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      )}
    </>
  );
};

export default DualScreen;
