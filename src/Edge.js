import React from "react";
import { Handle, Position, useStore, getBezierPath } from "reactflow";
import { Box, Tooltip } from "@mui/material";
import { EdgeHoverCard } from "./HoverCards";

export default function GraphEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <Tooltip
      placement={"top"}
      title={
        <React.Fragment>
          <EdgeHoverCard weight={data.weight} edgeType={data.edgeType} />
        </React.Fragment>
      }
    >
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </Tooltip>
  );
}
