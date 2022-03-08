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

const DnDFlow = ({ setSecondaryMap, setElements, elements }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow-type");
    const text = event.dataTransfer.getData("application/reactflow-text");

    const xPosition = event.clientX - reactFlowBounds.left;
    const yPosition = event.clientY - reactFlowBounds.top;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = [
      {
        id: getId(),
        type: "input",
        position: {
          x: xPosition,
          y: yPosition,
        },
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: "Flow 1" },
      },
      {
        id: getId(),
        type: "default",
        position: {
          x: xPosition + 250,
          y: yPosition,
        },
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: "Flow 2" },
      },
      {
        id: getId(),
        type: "output",
        position: {
          x: xPosition + 500,
          y: yPosition,
        },
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: "Flow 3" },
      },
      {
        id: "horizontal-e6-8",
        source: "dndnode_0",
        target: "dndnode_1",
      },
      {
        id: "horizontal-e6-8",
        source: "dndnode_1",
        target: "dndnode_2",
      },
    ];

    console.log(newNode);

    setElements((es) => es.concat(newNode));
  };

  return (
    <ReactFlowProvider>
      <div
        style={{ height: "50vh", borderTop: "solid 1px black" }}
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
