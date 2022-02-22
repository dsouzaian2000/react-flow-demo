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

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const data = [
  {
    id: "one",
    node_id: 0,
    question: "Are you married ?",
    type: "YES/NO",
    position: { x: 200, y: 50 },
  },
  {
    id: "two",
    node_id: 1,
    question: "What is your PAN number ?",
    type: "SHORT TEXT",
    position: { x: 200, y: 200 },
  },
  {
    id: "1-2",
    source: "one",
    target: "two",
  },
];

function IfElse() {
  const context = useContext(GlobalContext);
  const { node, setNode } = context;

  const [nodeElements, setNodeElements] = useState([]);

  useEffect(() => {
    const arr = [];
    data.forEach((item, index) => {
      if (!item.source) {
        arr.push({
          id: item.id,
          data: {
            label: (
              <QuestionNode
                index={index}
                id={item.id}
                question={item.question}
                type={item.type}
              />
            ),
          },
          position: item.position,
          style: questionStyle,
        });
      } else {
        arr.push({
          id: item.id,
          source: item.source,
          target: item.target,
          type: "buttonedge",
          data: {
            onClick: () => alert("HERE"),
          },
        });
      }
    });
    setNodeElements(arr);
  }, []);

  useEffect(() => {
    const arr1 = [];
    data.forEach((item, index) => {
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
  }, []);

  return (
    <div className={styles.container}>
      <ReactFlow edgeTypes={edgeTypes} elements={nodeElements}>
        <Background variant="lines" color="#E5E5E5" gap={1} size={0.5} />
      </ReactFlow>
    </div>
  );
}

export default IfElse;
