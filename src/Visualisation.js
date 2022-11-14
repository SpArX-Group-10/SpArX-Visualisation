import ReactFlow, { Controls, Background, getIncomers } from "reactflow";
import { useEffect, useMemo, useState } from "react";
import "reactflow/dist/style.css";
import { jsonToGraph } from "./GraphElements";
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
  //var initialEdgesHoverData = getInitialEdgesHoverData(processedEdges);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [graphJson, setGraphJson] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/graph", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        setGraphJson(JSON.parse(response));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const [nodes, edges] = jsonToGraph(graphJson);
    setNodes(nodes);
    setEdges(edges);
  }, [graphJson]);

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
        if (edge.target === curNode.id && edge.weight !== 0) {
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
