import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Header from './Header';
import Sidebar from './Sidebar';
import InputNode from './InputNode';
import LLMNode from './LLMNode';
import OutputNode from './OutputNode';

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
};

const Canvas = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  
  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  //drag & drop functionality
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    if (!type) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${type}-${nodes.length + 1}`,
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [nodes]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex relative">
        <div className="flex-grow relative">
          {nodes.length === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex justify-center items-center mx-auto mb-4">
                <span className="text-4xl text-blue-500">↓</span>
              </div>
              <p className="text-xl text-gray-500">
                Drag & drop to get started
              </p>
            </div>
          )}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Canvas;
