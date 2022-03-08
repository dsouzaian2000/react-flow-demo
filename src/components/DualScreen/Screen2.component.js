import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
} from "react-flow-renderer";
import Button from "@mui/material/Button";

import styles from "./DualScreen.module.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ setSecondaryMap }) => {
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
      id: "horizontal-e1-2",
      source: "horizontal-1",
      target: "horizontal-2",
      animated: true,
    },
    {
      id: "horizontal-e1-3",
      source: "horizontal-1",
      target: "horizontal-3",
      animated: true,
    },
    {
      id: "horizontal-e1-4",
      source: "horizontal-2",
      target: "horizontal-4",
      label: "edge label",
    },
    {
      id: "horizontal-e3-5",
      source: "horizontal-3",
      target: "horizontal-5",
      animated: true,
    },
    {
      id: "horizontal-e3-6",
      source: "horizontal-3",
      target: "horizontal-6",
      animated: true,
    },
    {
      id: "horizontal-e5-7",
      source: "horizontal-5",
      target: "horizontal-7",
      animated: true,
    },
    {
      id: "horizontal-e6-8",
      source: "horizontal-6",
      target: "horizontal-8",
      animated: true,
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(elements1);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
    setTimeout(() => {
      document.querySelector(".react-flow__controls-fitview").click();
    }, 100);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  return (
    <ReactFlowProvider>
      <div
        style={{ height: 350, borderTop: "solid 1px black" }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onLoad={onLoad}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <div className={styles.minimap_buttons}>
            <Button
              onClick={() => setSecondaryMap(false)}
              size="small"
              variant="contained"
            >
              X
            </Button>
          </div>
          <Controls />
          <Background variant="lines" color="#E5E5E5" gap={1} size={0.5} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default DnDFlow;
