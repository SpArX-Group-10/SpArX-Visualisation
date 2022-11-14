import ReactFlow, { Controls, Background, getIncomers } from "reactflow";
import { useMemo, useState } from "react";
import "reactflow/dist/style.css";
import { nodes as processedNodes, edges as processedEdges } from "./GraphElements";
import "./GraphElementsStyle.css";
import GraphNode from "./Node";
import React from "react";

const getInitialEdgesHoverData = (eds) => {
  var hoverStateCards = {};
  eds.forEach((edge) => {
    hoverStateCards[edge.id] = { weight: 0, edgeType: "SUPPORT" };
  });

  return hoverStateCards;
};

export default function Flow() {
  var initialEdgesHoverData = getInitialEdgesHoverData(processedEdges);

  const [nodes, setNodes] = useState(processedNodes);
  const [edges, setEdges] = useState(processedEdges);

  const nodeTypes = useMemo(() => ({ defaultNode: GraphNode }), []);

  const renderPreviousLayer = (event, curNode) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.layer === curNode.layer - 1) {
          node.hidden = false;
        }
        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.target === curNode.id) {
          edge.hidden = false;
        }
        return edge;
      })
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodeClick={renderPreviousLayer}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}