import styles from "./Nodes.module.css";

import { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { GlobalContext } from "../../GlobalContext";

const QuestionNode = ({ index, id, question, type }) => {
  const context = useContext(GlobalContext);
  const { node, setNode } = context;

  return (
    <div
      className={styles.node_container}
      onClick={() => {
        const arr = [...node];
        arr[index][id].showInput = true;
        setNode(arr);
      }}
    >
      <div>
        {node.length !== 0 && node[index][id].showInput ? (
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
              1.{" "}
              {node.length !== 0 && node[index][id].inputValue !== ""
                ? node[index][id].inputValue
                : question}
            </p>
            <span className={styles.question_badge}>{type}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionNode;
