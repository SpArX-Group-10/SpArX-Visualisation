import { getIncomers, Position } from "reactflow";

const initialNodes = [
  // Input layer
  {
    id: "1",
    className: "circle",
    data: { label: "X1" },
    position: { x: 0, y: 50 },
    type: "defaultNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 1,
    hidden: true,
  },
  {
    id: "2",
    data: { label: "X2" },
    className: "circle",
    position: { x: 0, y: 150 },
    type: "defaultNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 1,
    hidden: true,
  },
  {
    id: "3",
    data: { label: "X3" },
    className: "circle",
    position: { x: 0, y: 250 },
    type: "defaultNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 1,
    hidden: true,
  },
  // Hidden Layer 1
  {
    id: "4",
    type: "defaultNode",
    data: { label: "C1" },
    className: "circle",
    position: { x: 200, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 2,
    hidden: true,
  },
  {
    id: "5",
    type: "defaultNode",
    data: { label: "C2" },
    className: "circle",
    position: { x: 200, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 2,
    hidden: true,
  },
  {
    id: "6",
    type: "defaultNode",
    data: { label: "C3" },
    className: "circle",
    position: { x: 200, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 2,
    hidden: true,
  },
  {
    id: "7",
    type: "defaultNode",
    data: { label: "C4" },
    className: "circle",
    position: { x: 200, y: 300 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 2,
    hidden: true,
  },
  // Hidden Layer 2
  {
    id: "8",
    type: "defaultNode",
    data: { label: "C5" },
    className: "circle",
    position: { x: 400, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 3,
    hidden: true,
  },
  {
    id: "9",
    type: "defaultNode",
    data: { label: "C6" },
    className: "circle",
    position: { x: 400, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 3,
    hidden: true,
  },
  {
    id: "10",
    type: "defaultNode",
    className: "circle",
    data: { label: "C7" },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 3,
    hidden: true,
  },
  {
    id: "11",
    type: "defaultNode",
    className: "circle",
    data: { label: "C8" },
    position: { x: 400, y: 300 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 3,
    hidden: true,
  },
  // Output Layer
  {
    id: "12",
    className: "circle",
    data: { label: "O1" },
    position: { x: 600, y: 50 },
    type: "defaultNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 4,
  },
  {
    id: "13",
    className: "circle",
    data: { label: "O2" },
    position: { x: 600, y: 150 },
    type: "defaultNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 4,
  },
  {
    id: "14",
    className: "circle",
    data: { label: "O3" },
    position: { x: 600, y: 250 },
    type: "defaultNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    layer: 4,
  },
];

const initialEdges = [
  {
    id: "1-4",
    source: "1",
    target: "4",
    type: "straight",
    hidden: true,
    layer: 1,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "1-5",
    source: "1",
    target: "5",
    type: "straight",
    hidden: true,
    layer: 1,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "1-6",
    source: "1",
    target: "6",
    type: "straight",
    hidden: true,
    layer: 1,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "5-7",
    source: "5",
    target: "8",
    type: "straight",
    hidden: true,
    layer: 1,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },

  {
    id: "8-12",
    source: "8",
    target: "12",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "9-12",
    source: "9",
    target: "12",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "10-12",
    source: "10",
    target: "12",
    type: "straight",
    hidden: true,
    layer: 3,
    markerStart: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "11-12",
    source: "11",
    target: "12",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },

  {
    id: "8-13",
    source: "8",
    target: "13",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "9-13",
    source: "9",
    target: "13",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "10-13",
    source: "10",
    target: "13",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "11-13",
    source: "11",
    target: "13",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },

  {
    id: "8-14",
    source: "8",
    target: "14",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "9-14",
    source: "9",
    target: "14",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "10-14",
    source: "10",
    target: "14",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
  {
    id: "11-14",
    source: "11",
    target: "14",
    type: "straight",
    hidden: true,
    layer: 3,
    markerEnd: { type: "arrow", width: 20, height: 20 },
  },
];

const getInitialNodesHoverData = (nds, eds) => {
  var hoverStateCards = {};
  nds.forEach((nd) => {
    hoverStateCards[nd.data.label] = {
      argument: nd.data.label,
      supportingNodes: nd.supportingNodes,
      attackingNodes: nd.attackingNodes,
      incomingNodes: getIncomers(nd, nds, eds),
    };
  });

  return hoverStateCards;
};

export const jsonToGraph = (myData) => {
  if (!myData) {
    return [[], []];
  }
  var processedNodes = [];
  const myNodes = myData["nodes"];
  if (!myNodes) {
    return [[], []];
  }
  myNodes.forEach((node) => {
    var hidden = node.label[0] !== "O";
    processedNodes[node.id] = {
      id: String(node.id),
      className: "circle",
      data: { label: node.label },
      position: { x: node.position.x * 3, y: node.position.y * 3 },
      type: "defaultNode",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: node.layer + 1,
      supportingNodes: node.supporting_nodes,
      attackingNodes: node.attacking_nodes,
      hidden: hidden,
    };
  });

  var processedEdges = [];
  const myEdges = myData.edges;
  myEdges.forEach((edge) => {
    var color;
    if (edge.edge_type === "SUPPORT") color = "green";
    else color = "red";
    processedEdges.push({
      id: edge.start_node.toString() + "-" + edge.end_node.toString(),
      source: edge.start_node.toString(),
      target: edge.end_node.toString(),
      layer: edge.layer + 1,
      type: "straight",
      hidden: true,
      weight: edge.weight,
      markerEnd: { type: "arrow", width: 20, height: 20 },
      style: { stroke: color },
    });
  });

  var initialNodesHoverData = getInitialNodesHoverData(
    processedNodes,
    processedEdges
  );

  const nodes = processedNodes.map((nd) => {
    nd.data.argument = initialNodesHoverData[nd.data.label].argument;
    nd.data.incomingNodes = initialNodesHoverData[nd.data.label].incomingNodes;
    nd.data.supportingNodes =
      initialNodesHoverData[nd.data.label].supportingNodes;
    nd.data.attackingNodes =
      initialNodesHoverData[nd.data.label].attackingNodes;
    return nd;
  });

  return [nodes, processedEdges];
};

// export const edges = processedEdges
