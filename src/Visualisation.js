import ReactFlow, { Controls, Background, getIncomers } from "reactflow";
import { useState } from "react";
import "reactflow/dist/style.css";
import { nodes as initialNodes, edges as initialEdges } from "./GraphElements";
import "./GraphElementsStyle.css";
import { NodeHoverCard, EdgeHoverCard } from "./HoverCards";

const getInitialNodesHoverData = (nds, eds) => {
  var hoverStateCards = {};
  nds.forEach(nd => {
    hoverStateCards[nd.label] = { argument: nd.label, incomingNodes: getIncomers(nd, nds, eds), };
  });

  return hoverStateCards;
};

const getInitialEdgesHoverData = (eds) => {
  var hoverStateCards = {};
  eds.forEach(edge => {
    hoverStateCards[edge.id] = { weight: 0, edgeType: 'SUPPORT', };
  });

  return hoverStateCards;
};

function Flow() {
  var initialNodesHoverData = getInitialNodesHoverData(initialNodes, initialEdges);
  var initialEdgesHoverData = getInitialEdgesHoverData(initialEdges);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

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
      <ReactFlow nodes={nodes} edges={edges} 
          onNodeClick={renderPreviousLayer}
          onNodeMouseEnter={(event, node) => {setIsHovered(true); setHoveredNode(node)}}
          onMouseLeave={(event, node) => {setIsHovered(false); setHoveredNode(null)}}>
        {isHovered ? <NodeHoverCard data = {initialNodesHoverData[hoveredNode.label]}/> : null}
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
