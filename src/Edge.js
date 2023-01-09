import React, { useState } from "react";
import { getBezierPath } from "reactflow";
import { Tooltip } from "@mui/material";
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
  const [isHovered, setIsHovered] = useState(false)
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const SCALING = 10;
  return (
    <Tooltip
      placement={"top"}
      title={
        <React.Fragment>
          <EdgeHoverCard weight={data.weight} edgeType={data.edgeType} setIsHovered={setIsHovered} />
        </React.Fragment>
      }
    >
      <path
        id={id}
        style={{...style, strokeWidth: (isHovered ? 3 : 1) * Math.abs(data.weight) * SCALING}}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </Tooltip>
  );
}
