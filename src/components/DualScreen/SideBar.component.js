import React from "react";

import styles from "./DualScreen.module.css";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={styles.sidebar}>
      <div
        className={styles.input}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className={styles.default}
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className={styles.output}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;
