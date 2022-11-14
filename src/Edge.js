import React from "react";
import { Handle, Position, useStore, getBezierPath } from "reactflow";
import { Box, Tooltip } from "@mui/material";
import { EdgeHoverCard } from "./HoverCards";

const CustomEdge = React.forwardRef(({
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
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
})

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
  return (
    <Tooltip
      placement="right"
      title={
        <React.Fragment>
          <EdgeHoverCard
            weight={data.weight}
            edgeType={data.edgeType}
          />
        </React.Fragment>
      }
    >
     <CustomEdge id={id} sourceX={sourceX} sourceY={sourceY} targetX={targetX} targetY={targetY} sourcePosition={sourcePosition} targetPosition={targetPosition} style={style} data={data} markerEnd={markerEnd}/>
    </Tooltip>
  );
}

