import React from "react";

import styles from "./DualScreen.module.css";

const Sidebar = () => {
  const onDragStart = (event, nodeType, nodeText) => {
    event.dataTransfer.setData("application/reactflow-type", nodeType);
    event.dataTransfer.setData("application/reactflow-text", nodeText);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={styles.sidebar}>
      <div
        className={styles.input}
        onDragStart={(event) => onDragStart(event, "input", "Primitive Flow")}
        draggable
      >
        Primitive Flow
      </div>
      <div
        className={styles.default}
        onDragStart={(event) => onDragStart(event, "default", "App Flow")}
        draggable
      >
        App Flow
      </div>
      <div
        className={styles.output}
        onDragStart={(event) => onDragStart(event, "output", "Custom Flow")}
        draggable
      >
        Custom Flow
      </div>
    </aside>
  );
};

export default Sidebar;
