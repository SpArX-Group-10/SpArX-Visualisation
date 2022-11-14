import { getIncomers, Position } from "reactflow";

const getNodesHoverData = (nds, eds) => {
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
      position: { x: node.position.x * 6, y: node.position.y * 3 },
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
      type: "defaultEdge",
      hidden: true,
      data: {
        weight: edge.weight,
        edgeType: edge.edge_type,
      },
      markerEnd: { type: "arrow", width: 20, height: 20 },
      style: { stroke: color },
      animated: true,
    });
  });

  var nodesHoverData = getNodesHoverData(processedNodes, processedEdges);

  const nodes = processedNodes.map((nd) => {
    nd.data.argument = nodesHoverData[nd.data.label].argument;
    nd.data.incomingNodes = nodesHoverData[nd.data.label].incomingNodes;
    nd.data.supportingNodes = nodesHoverData[nd.data.label].supportingNodes;
    nd.data.attackingNodes = nodesHoverData[nd.data.label].attackingNodes;
    return nd;
  });

  return [nodes, processedEdges];
};

// export const edges = processedEdges
