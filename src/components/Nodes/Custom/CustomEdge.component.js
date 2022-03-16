import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";

export default function CustomEdgeButton({
  id,
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
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  }); //
  const markerEnd = getMarkerEnd("arrowclosed", markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path animated"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
}
