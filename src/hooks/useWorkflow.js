import { useState, useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';

const useWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (type, position) => {
      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, ...newData } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
  };
};

export default useWorkflow;