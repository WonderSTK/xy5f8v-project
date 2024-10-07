import React from 'react';
import { DocumentTextIcon, CogIcon, DocumentDuplicateIcon } from '@heroicons/react/outline';

const nodeTypes = [
  { type: 'input', label: 'Input', icon: DocumentTextIcon },
  { type: 'llm', label: 'LLM Engine', icon: CogIcon },
  { type: 'output', label: 'Output', icon: DocumentDuplicateIcon },
];

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-60 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Components</h2>
      <div className="border-b border-gray-200 mb-4"></div>
      <p className="text-sm text-gray-500 mb-10">Drag and Drop</p>
      <ul className='pb-[300px]'>
        {nodeTypes.map((node) => (
          <li
            key={node.type}
            className="mb-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50 cursor-move"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <div className="flex items-center">
              <node.icon className="h-5 w-5 mr-2 text-gray-500" />
              <span>{node.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;