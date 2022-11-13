import React from "react";
const div_width = 50;
const div_height = 50;
const node_height = 30;
const node_width = 30;
const right_offset = 10;
export const NodeHoverCard = ({ argument, incomingNodes }) => {
  var incoming = "[" + incomingNodes.map((nd) => nd.data.label).join(",") + "]";

  return (
    <div>
      Node argument: {argument}
      <br />
      Directly supported/attacked by: {incoming}
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
