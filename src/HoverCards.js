import React from "react";
export const NodeHoverCard = ({ argument, incomingNodes, supportingNodes, attackingNodes }) => {
  // var incoming = "[" + incomingNodes.map((nd) => nd.data.label).join(",") + "]";
  var supporting_nodes = "[" + supportingNodes.join(",") + "]";
  var attacking_nodes = "[" + attackingNodes.join(",") + "]";

  return (
    <div>
      Node label: {argument}
      <br />
      Directly supported by: {supporting_nodes}
      <br />
      Dirrectly attacked by: {attacking_nodes}
    </div>
  );
};

export const EdgeHoverCard = ({ weight, edgeType }) => {
  return (
    <div>
      Weight: {weight}
      <br />
      Edge type: {edgeType}
    </div>
  );
};
