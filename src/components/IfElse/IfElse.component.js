import { useState, useEffect, useRef, useContext } from "react";
import ReactFlow, { Background } from "react-flow-renderer";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import styles from "./IfElse.module.css";
import { GlobalContext } from "../../GlobalContext";

import QuestionNode from "../Nodes/QuestionNode.component";
import ButtonEdge from "../Nodes/ButtonEdge.component";

const questionStyle = {
  width: 500,
  border: "none",
  borderRadius: 10,
  padding: "1rem 0rem",
};
const ifElseStyle = {
  width: 300,
  border: "none",
  borderRadius: 10,
  padding: "1rem 0rem",
};

const edgeTypes = {
  buttonedge: ButtonEdge,
};

function IfElse() {
  const context = useContext(GlobalContext);
  const {
    node,
    setNode,
    nodeData,
    setNodeData,
    nodeElements,
    setNodeElements,
  } = context;

  useEffect(() => {
    const arr = [];
    nodeData.forEach((item, index) => {
      let arr1 = {};
      if (!item.source) {
        arr1 = {
          id: item.id,
          data: {
            question: item.question,
            qType: item.qType,
          },
          position: item.position,
        };
        if (item.type === "default") {
          arr1.data.label = (
            <QuestionNode qNo={item.qNo} index={index} id={item.id} />
          );
          arr1.style = questionStyle;
        }
        if (item.type === "if-else") {
          arr1.data = { label: item.condition };
          arr1.style = ifElseStyle;
        }
      } else {
        arr1 = {
          id: item.id,
          source: item.source,
          target: item.target,
        };
        if (item.eType === "default") {
          arr1.type = "buttonedge";
        }
      }
      arr.push(arr1);
    });
    setNodeElements(arr);
  }, [nodeData]);

  useEffect(() => {
    const arr1 = [];
    nodeData.forEach((item, index) => {
      if (!item.source) {
        const arr = {};
        arr[item.id] = {
          showInput: false,
          inputValue: "",
        };
        arr1.push(arr);
      }
    });
    setNode(arr1);
  }, [nodeElements]);

  return (
    <div className={styles.container}>
      <ReactFlow edgeTypes={edgeTypes} elements={nodeElements}>
        <Background variant="lines" color="#E5E5E5" gap={1} size={0.5} />
      </ReactFlow>
    </div>
  );
}

export default IfElse;
