import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";

import { GlobalContext } from "../../GlobalContext";
import QuestionNode from "../Nodes/QuestionNode.component";

const foreignObjectSize = 40;

export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
  onClick,
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const ifElseStyle = {
    width: 300,
    border: "none",
    borderRadius: 10,
    padding: "1rem 0rem",
  };

  const context = React.useContext(GlobalContext);
  const { nodeElements, setNodeElements, nodeData, setNodeData } = context;

  const onEdgeClick = (evt, source, target, eid) => {
    evt.stopPropagation();
    const arr = [...nodeData];
    const sourceId = parseInt(target);
    const sourcePositionX = nodeElements[sourceId - 1].position.x;
    const sourcePositionY = nodeElements[sourceId - 1].position.y;

    const ifQ = 2;
    const elseQ = 3;

    arr.splice(
      sourceId - 1,
      0,
      {
        id: sourceId.toString(),
        condition: "if YES",
        position: { x: sourcePositionX - 200, y: sourcePositionY },
        type: "if-else",
      },
      {
        id: (sourceId + 1).toString(),
        condition: "if NO",
        position: { x: sourcePositionX + 400, y: sourcePositionY },
        type: "if-else",
      }
    );

    arr.map((item, index) => {
      if (index > sourceId && !item.source) {
        item.id = (index + 1).toString();
        item.position.y = item.position.y + 150;
      }
    });

    const ifQIndex = arr.findIndex((el) => el.qNo === ifQ);
    const elseQIndex = arr.findIndex((el) => el.qNo === elseQ);

    arr[ifQIndex].position.x = sourcePositionX - 300;
    arr[elseQIndex].position.x = sourcePositionX + 300;

    arr[elseQIndex].position.y = arr[ifQIndex].position.y;

    arr.map((item, index) => {
      if (index > elseQIndex && !item.source) {
        item.position.y = item.position.y - 150;
      }
    });

    arr.splice(
      arr.findIndex((el) => el.id === eid),
      1
    );

    arr.push({
      id: source + "_" + target,
      source: source,
      target: target,
    });
    arr.push({
      id: source + "_" + (parseInt(target) + 1).toString(),
      source: source,
      target: (parseInt(target) + 1).toString(),
    });

    arr.push({
      id: target + "-" + arr[ifQIndex].id,
      source: target,
      target: arr[ifQIndex].id,
    });
    arr.push({
      id: (parseInt(target) + 1).toString() + "-" + arr[elseQIndex].id,
      source: (parseInt(target) + 1).toString(),
      target: arr[elseQIndex].id,
    });

    arr.push({
      id:
        arr[ifQIndex].id +
        "-" +
        arr[arr.findIndex((el) => el.qNo === arr[elseQIndex + 1].qNo)].id,
      source: arr[ifQIndex].id,
      target: arr[arr.findIndex((el) => el.qNo === arr[elseQIndex + 1].qNo)].id,
    });

    arr.push({
      id:
        arr[elseQIndex].id +
        "-" +
        arr[arr.findIndex((el) => el.qNo === arr[elseQIndex + 1].qNo)].id,
      source: arr[elseQIndex].id,
      target: arr[arr.findIndex((el) => el.qNo === arr[elseQIndex + 1].qNo)].id,
    });

    setNodeData(arr);
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button
            className="edgebutton"
            onClick={(event) => onEdgeClick(event, source, target, id)}
          >
            +
          </button>
        </body>
      </foreignObject>
    </>
  );
}
