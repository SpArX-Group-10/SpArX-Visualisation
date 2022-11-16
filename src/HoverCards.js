import React, { useEffect } from "react";
export const NodeHoverCard = ({
  argument,
  incomingNodes,
  supportingNodes,
  attackingNodes,
  topN,
}) => {
  // var incoming = "[" + incomingNodes.map((nd) => nd.data.label).join(",") + "]";
  var supporting_nodes = "[" + supportingNodes.join(",") + "]";
  var attacking_nodes = "[" + attackingNodes.join(",") + "]";
  console.log(topN);

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

export const EdgeHoverCard = ({ weight, edgeType, setIsHovered }) => {
  useEffect(() => {
    setIsHovered(true)
    return (() => { setIsHovered(false) })
  }, [setIsHovered]);
  return (
    <div>
      Weight: {weight}
      <br />
      Edge type: {edgeType}
    </div>
  );
};
