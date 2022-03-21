import { useContext, useEffect, memo, useState } from "react";
import styles from "./Custom.module.css";
import { Handle, useStore, useViewport } from "react-flow-renderer";
import { GlobalContext } from "../../../GlobalContext";
import { ConstructionOutlined } from "@mui/icons-material";

export default memo(({ data }) => {
  const context = useContext(GlobalContext);
  const { nodeWidth, setNodeWidth, setGroupWidth } = context;

  const zoom = useViewport().zoom;

  const [prevZoom, setPrevZoom] = useState();
  const store = useStore();

  const grpWidth = 250 * 3 + 20 * 3 + 20;

  useEffect(() => {
    const roundFigure = Math.round(zoom * 1000);

    if (roundFigure >= 1000) {
      setNodeWidth(250);
      setGroupWidth(grpWidth);
    }
    if (roundFigure <= 950 && roundFigure >= 900) {
      setNodeWidth(225);
      setGroupWidth(grpWidth - 20);
    }
    if (roundFigure <= 900 && roundFigure >= 850) {
      setNodeWidth(200);
      setGroupWidth(grpWidth - 40);
    }
    if (roundFigure <= 850 && roundFigure >= 800) {
      setNodeWidth(175);
      setGroupWidth(grpWidth - 80);
    }
    if (roundFigure <= 800 && roundFigure >= 750) {
      setNodeWidth(150);
      setGroupWidth(grpWidth - 100);
    }
    if (roundFigure <= 750) {
      setNodeWidth(100);
      setGroupWidth(grpWidth - 140);
    }
  }, [zoom]);

  console.log(store);

  return (
    <>
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
      <div
        style={{ justifyContent: nodeWidth >= 100 ? "center" : "flexStart" }}
        className={styles.node_container}
        onClick={() => {
          if (data.onClick) data.onClick();
        }}
      >
        <div className={styles.question_no}>Q{data.questionNo}</div>
        {nodeWidth > 100 && (
          <div className={styles.question}>{data.question}</div>
        )}
      </div>
    </>
  );
});
