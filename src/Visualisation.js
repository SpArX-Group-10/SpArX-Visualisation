import ReactFlow, { Controls, Background, getIncomers, getConnectedEdges} from 'reactflow';
import {useState} from 'react'
import 'reactflow/dist/style.css';
import { nodes as initialNodes, edges as initialEdges } from './GraphElements';
import './GraphElementsStyle.css'

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const renderPreviousLayer = (event, curNode) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.layer === curNode.layer - 1) {
          // when you update a simple type you can just update the value
          node.hidden = false;
        }

        return node;
      })
    );
    // console.log(nodes);
    // let incomingNodes = getIncomers(curNode, nodes, edges);
    // let connectedEdges = getConnectedEdges([curNode], edges);
    // incomingNodes.forEach(node => { node.hidden = false; });
    // connectedEdges.forEach(edge => { edge.hidden = false; });
    // setNodes(nodes);
    // console.log(nodes);
    // setEdges(edges);
  }

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodeClick={renderPreviousLayer}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
