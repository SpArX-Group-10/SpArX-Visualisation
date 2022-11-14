import ReactFlow, { Controls, Background } from "reactflow";
import { useEffect, useMemo, useState } from "react";
import "reactflow/dist/style.css";
import { jsonToGraph } from "./GraphElements";
import "./GraphElementsStyle.css";
import GraphEdge from "./Edge";
import GraphNode from "./Node";
import React from "react";

export default function Flow() {
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
  const edgeTypes = useMemo(() => ({ defaultEdge: GraphEdge }), []);

  const renderPreviousLayer = (_, curNode) => {
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
        if (edge.target === curNode.id && edge.data.weight !== 0) {
          edge.hidden = false;
        }
        return edge;
      })
    );
  };

  const showEdgeLabel = (_, curEdge) => {
    setNodes((nds) =>
      nds.map((node) => {
        return node;
      })
    );

    setEdges((eds) =>
      eds.map((edge) => {
        if (edge === curEdge) {
          if (curEdge.showing_label) {
            curEdge.label = "";
            curEdge.showing_label = false;
          } else {
            curEdge.label = String(curEdge.data.weight.toFixed(4));
            curEdge.showing_label = true;
          }
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
        edgeTypes={edgeTypes}
        onNodeClick={renderPreviousLayer}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
