import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useSelector } from 'react-redux';
import { DocumentDuplicateIcon } from '@heroicons/react/outline';

const OutputNode = () => {
  const output = useSelector((state) => state.output.response); // the output response from outputSlice

  return (
    <div className="bg-white rounded-lg shadow-md w-[325px] h-[264px] p-4 relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 -left-1.5 top-1/2 bg-blue-400 border-2 border-white"
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
        <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-700" />
          <span className="font-bold text-lg">OUTPUT</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
      <div className="bg-blue-50 p-3 rounded-md mb-4">
        <p className="text-sm text-gray-600">OpenAGI Response</p>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Output Response</label>
        <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 h-20 overflow-auto">
          {output || 'Output Response will be shown here'}
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">LLM Engine</div>
    </div>
  );
};

export default memo(OutputNode);
