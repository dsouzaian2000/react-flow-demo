import React, { useState, useRef, useEffect, useContext } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import CustomEdge from "../Nodes/Custom/CustomEdge.component";
import Sidebar from "./SideBar.component";
import CustomNode from "../Nodes/Custom/Custom.component";
import Button from "@mui/material/Button";

import styles from "./DualScreen.module.css";

const edgeTypes = {
  customedge: CustomEdge,
};

const nodeStyle = {
  background: "#424242",
  color: "#fff",
  width: "250px",
  border: "none",
  borderRadius: 5,
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: 0, y: 0 },
    style: {
      width: 270,
      height: 240,
    },
  },
  {
    id: "B",
    type: "custom",
    data: {
      question: "What's your mobile number ?.",
      questionNo: 3,
    },
    position: { x: 10, y: 10 },
    parentNode: "A",
    extent: "parent",
    style: nodeStyle,
  },
  {
    id: "C",
    type: "custom",
    data: {
      question: "What's your mobile number ?.",
      questionNo: 3,
    },
    position: { x: 10, y: 90 },
    parentNode: "A",
    extent: "parent",
    style: nodeStyle,
  },
];

const initialEdges = [];

const DnDFlow = ({ setSecondaryMap, setElements, elements }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((els) => addEdge(params, els));

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  return (
    <ReactFlowProvider>
      <div
        style={{ height: "50vh", borderTop: "solid 1px #fff" }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          onConnect={onConnect}
          onLoad={onLoad}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes}
          style={{ background: "#131516" }}
          nodeTypes={nodeTypes}
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
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default DnDFlow;
