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
import { GlobalContext } from "../../GlobalContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

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

const DnDFlow = ({ setSecondaryMap, showSecondaryMap }) => {
  const context = useContext(GlobalContext);
  const { nodeWidth, setNodeWidth } = context;

  const nodeStyle = {
    background: "#424242",
    color: "#fff",
    width: context.nodeWidth,
    border: "none",
    borderRadius: 5,
  };

  const initialNodes = [
    {
      id: "horizontal-1",
      sourcePosition: "right",
      type: "custom",
      data: {
        question: "Hey, welcome to this GoForm.",
        questionNo: 1,
      },
      position: { x: 0, y: 80 },
      style: nodeStyle,
    },
    {
      id: "A",
      type: "group",
      data: { label: null },
      position: { x: 300, y: 40 },
      style: {
        width: 580,
        height: 140,
        backgroundColor: "rgba(240,240,240,0.25)",
      },
    },

    {
      id: "horizontal-2",
      sourcePosition: "right",
      targetPosition: "left",
      type: "custom",
      data: {
        question: "What do we call you?",
        questionNo: 2,
        onClick: () => {
          setSecondaryMap(true);
        },
      },
      position: { x: 10, y: 40 },
      style: nodeStyle,
      parentNode: "A",
    },
    {
      id: "horizontal-3",
      sourcePosition: "right",
      targetPosition: "left",
      type: "custom",
      data: {
        question: "What's your mobile number ?.",
        questionNo: 3,
      },
      position: { x: 300, y: 40 },
      style: nodeStyle,
      parentNode: "A",
    },
    {
      id: "horizontal-4",
      sourcePosition: "right",
      targetPosition: "left",
      type: "custom",
      data: {
        question: "What's your email ID?",
        questionNo: 4,
      },
      position: { x: 950, y: 80 },
      style: nodeStyle,
    },
  ];

  const initialEdges = [
    {
      id: "horizontal-e1-2",
      source: "horizontal-1",
      target: "horizontal-2",
      type: "customedge",
    },
    {
      id: "horizontal-e2-3",
      source: "horizontal-2",
      target: "horizontal-3",
      type: "customedge",
    },
    {
      id: "horizontal-e3-4",
      source: "horizontal-3",
      target: "horizontal-4",
      type: "customedge",
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setElements, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((els) => addEdge(params, els));
  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
    setTimeout(() => {
      document.querySelectorAll(".react-flow__controls-fitview")[0].click();
    }, 100);
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
      style: nodeStyle,
      data: { label: <CustomNode label={text} /> },
    };

    setElements((es) => es.concat(newNode));
  };

  useEffect(() => {
    setElements((nds) =>
      nds.map((node) => {
        if (node.type !== "group")
          node.style = { ...node.style, width: nodeWidth };

        return node;
      })
    );
  }, [nodeWidth, setElements]);

  return (
    <ReactFlowProvider>
      <div
        style={{ height: !showSecondaryMap ? "100vh" : "50vh" }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes}
          onConnect={onConnect}
          onLoad={onLoad}
          onDrop={onDrop}
          onDragOver={onDragOver}
          style={{ background: "#131516" }}
          nodeTypes={nodeTypes}
        >
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default DnDFlow;
