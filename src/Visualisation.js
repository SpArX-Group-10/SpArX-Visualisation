import ReactFlow, { Controls, Background } from "reactflow";
import { useState } from "react";
import "reactflow/dist/style.css";
import { nodes as initialNodes, edges as initialEdges } from "./GraphElements";
import "./GraphElementsStyle.css";

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={renderPreviousLayer}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
