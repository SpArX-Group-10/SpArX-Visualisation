import React from "react";
const div_width = 50;
const div_height = 50;
const node_height = 30;
const node_width = 30;
const right_offset = 10;
export const NodeHoverCard = ({
  argument,
  incomingNodes,
  viewportPosition,
  hoverPosition,
  zoom,
}) => {
  return (
    <div
      style={{
        width: div_width * zoom,
        height: div_height * zoom,
        backgroundColor: "red",
        top: (node_height - div_height / 2) * zoom,
        left: (node_width * 2 + right_offset) * zoom,
        position: "absolute",
        zIndex: 1,
        transform: `translate(${
          viewportPosition.X + zoom * hoverPosition.X
        }px, ${viewportPosition.Y + zoom * hoverPosition.Y}px)`,
      }}
    >
      <div style={{ width: 25, height: 25 }} className="argument">
        {" "}
        {argument}{" "}
      </div>
      <div style={{ width: 25, height: 25 }} className="incomingNodes">
        {" "}
        {incomingNodes}{" "}
      </div>
    </div>
  );
};

export const EdgeHoverCard = ({ weight, edgeType, position }) => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        backgroundColor: "blue",
        top: position.Y,
        left: position.X,
        position: "absolute",
        zIndex: 100,
      }}
    >
      <div style={{ width: 25, height: 25 }} className="weight">
        {" "}
        {weight}{" "}
      </div>
      <div style={{ width: 25, height: 25 }} className="edgeType">
        {" "}
        {edgeType}{" "}
      </div>
    </div>
  );
};
