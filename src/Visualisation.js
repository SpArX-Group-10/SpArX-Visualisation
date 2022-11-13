import ReactFlow, {
  Controls,
  Background,
  getIncomers,
  useStore,
  ReactFlowProvider,
} from "reactflow";
import { useEffect, useState } from "react";
import "reactflow/dist/style.css";
import { nodes as initialNodes, edges as initialEdges } from "./GraphElements";
import "./GraphElementsStyle.css";
import { NodeHoverCard, EdgeHoverCard } from "./HoverCards";

const getInitialNodesHoverData = (nds, eds) => {
  var hoverStateCards = {};
  nds.forEach((nd) => {
    hoverStateCards[nd.label] = {
      argument: nd.label,
      incomingNodes: getIncomers(nd, nds, eds),
    };
  });

  return hoverStateCards;
};

const getInitialEdgesHoverData = (eds) => {
  var hoverStateCards = {};
  eds.forEach((edge) => {
    hoverStateCards[edge.id] = { weight: 0, edgeType: "SUPPORT" };
  });

  return hoverStateCards;
};

const zoomSelector = (s) => s.transform[2];
function Flow({
  nodes,
  edges,
  renderPreviousLayer,
  handleNodeEnter,
  handleNodeLeave,
  handleMoveEnd,
  setZoom,
}) {
  const internal_zoom = useStore(zoomSelector);
  useEffect(() => {
    setZoom(internal_zoom);
  }, [internal_zoom]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={renderPreviousLayer}
      onNodeMouseEnter={handleNodeEnter}
      onNodeMouseLeave={handleNodeLeave}
      onMoveEnd={handleMoveEnd}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}

function FlowWithProvider() {
  var initialNodesHoverData = getInitialNodesHoverData(
    initialNodes,
    initialEdges
  );
  var initialEdgesHoverData = getInitialEdgesHoverData(initialEdges);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [viewportPosition, setViewportPosition] = useState({ X: 0, Y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hoverPosition, setHoverPosition] = useState({ X: 0, Y: 0 });

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

  const handleNodeEnter = (event, node) => {
    setIsHovered(true);
    setHoveredNode(node);
    setHoverPosition({ X: node.position.x, Y: node.position.y });
  };

  const handleNodeLeave = (event, node) => {
    setIsHovered(false);
    setHoveredNode(null);
  };

  const handleMoveEnd = (event, viewport) => {
    setViewportPosition({ X: viewport.x, Y: viewport.y });
    setZoom(viewport.zoom);
  };

  return (
    <div style={{ height: "100vh" }}>
      {isHovered ? (
        <NodeHoverCard
          data={initialNodesHoverData[hoveredNode.label]}
          viewportPosition={viewportPosition}
          hoverPosition={hoverPosition}
          zoom={zoom}
        />
      ) : null}
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          renderPreviousLayer={renderPreviousLayer}
          handleNodeEnter={handleNodeEnter}
          handleNodeLeave={handleNodeLeave}
          handleMoveEnd={handleMoveEnd}
          setZoom={setZoom}
        />
      </ReactFlowProvider>
    </div>
  );
}

export default FlowWithProvider;
