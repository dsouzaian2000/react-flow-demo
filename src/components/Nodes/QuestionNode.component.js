import styles from "./Nodes.module.css";

import { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { GlobalContext } from "../../GlobalContext";

const QuestionNode = ({ index, id, question, type, qNo }) => {
  const context = useContext(GlobalContext);
  const { node, setNode, nodeElements, setNodeElements } = context;

  const edgeAnimation = (show) => {
    const arr = [...nodeElements];
    arr.map((item, index) => {
      if (item.source === id || item.target === id) arr[index].animated = show;
    });
    setNodeElements(arr);
  };

  return (
    <div
      className={styles.node_container}
      onClick={() => {
        const arr = [...node];
        arr[index][id].showInput = true;
        setNode(arr);
      }}
      onMouseOver={() => edgeAnimation(true)}
      onMouseOut={() => edgeAnimation(false)}
    >
      <div>
        {node[index] && node[index][id].showInput ? (
          <div className={styles.node_text_container}>
            <TextField
              autoFocus={true}
              size="small"
              onBlur={() => {
                const arr = [...node];
                arr[index][id].showInput = false;
                setNode(arr);
              }}
              onChange={(e) => {
                const arr = [...node];
                arr[index][id].inputValue = e.target.value;
                setNode(arr);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const arr = [...node];
                  arr[index][id].showInput = false;
                  setNode(arr);
                }
              }}
              value={node ? node[index][id].inputValue : ""}
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
              {qNo}.{" "}
              {node[index] && node[index][id].inputValue !== ""
                ? node[index][id].inputValue
                : nodeElements[index].data.question}
            </p>
            <span className={styles.question_badge}>
              {nodeElements[index].data.qType}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionNode;
