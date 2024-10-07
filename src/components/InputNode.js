import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { setPrompt } from '../utils/inputSlice'; 
import { useDispatch } from 'react-redux';
import { DocumentTextIcon } from '@heroicons/react/outline';

const InputNode = ({ data }) => {
  
  const [inputValue, setInputValue] = useState(data.input || ''); 
  const dispatch = useDispatch();

  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); 
    dispatch(setPrompt(value)); // Dispatch value to Redux store
    if (data.onChange) {
      data.onChange(value); // If there's any callback passed via props
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-[325px] h-[264px] p-4 relative">
      <Handle
        type="source"
        position={Position.Right}
        className="w-5 h-5 absolute bottom-4 right-4"
      />
      <div className="flex items-center mb-4">
      <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-700" /> 
        <div className="font-bold text-lg">INPUT</div>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Write the input/ question you want to ask
      </div>
      <div className="font-medium mb-2">Input</div>
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
        placeholder="Type your Prompt here.."
        value={inputValue} 
        onChange={handleInputChange} 
      />
      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
        LLM Engine
      </div>
    </div>
  );
};

export default memo(InputNode);
