import React, { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';  
import { Handle, Position } from 'reactflow';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { setApiKey } from '../utils/llmSlice';  

const LLMNode = ({ data }) => {
  const dispatch = useDispatch();  
  const [localData, setLocalData] = useState({
    model: 'gpt-3.5',
    apiBase: 'https/openai.base.link',
    apiKey: '',
    maxTokens: 100,
    temperature: 0.5,
  });

  useEffect(() => {
    if (data) {
      setLocalData(prevData => ({ ...prevData, ...data }));
    }
  }, [data]);

  const handleChange = (field, value) => {
    let processedValue = value;

    if (field === 'maxTokens') {
      processedValue = Math.max(1, Math.min(4096, parseInt(value, 10) || 0));
    } else if (field === 'temperature') {
      processedValue = Math.max(0, Math.min(1, parseFloat(value) || 0));
    }

    setLocalData(prevData => ({ ...prevData, [field]: processedValue }));

    //dispatch apiKey to Redux
    if (field === 'apiKey') {
      dispatch(setApiKey(processedValue));
    }

    if (typeof data.onChange === 'function') {
      data.onChange(field, processedValue);
    }
  };

  const handleTemperatureStep = (direction) => {
    const step = 0.1;
    const newValue = direction === 'up'
      ? Math.min(1, localData.temperature + step)
      : Math.max(0, localData.temperature - step);
    handleChange('temperature', newValue.toFixed(1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-[325px] h-[616px] p-4 relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 -left-1.5 top-1/2 bg-green-400 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 -right-1.5 top-1/2 bg-purple-400 border-2 border-white"
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-bold text-lg">LLM ENGINE</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
      <div className="bg-blue-50 p-3 rounded-md mb-4">
        <p className="text-sm text-gray-600">LLM Configuration</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={localData.model}
            onChange={(e) => handleChange('model', e.target.value)}
          >
            <option value="gpt-3.5">gpt-3.5</option>
            <option value="gpt-4">gpt-4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI API Base</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="type something"
            value={localData.apiBase}
            onChange={(e) => handleChange('apiBase', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI Key</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="paste your key here"
            value={localData.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}  // Store API key in Redux
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Tokens</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={localData.maxTokens}
            onChange={(e) => handleChange('maxTokens', e.target.value)}
            min="1"
            max="4096"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
          <div className="flex items-center">
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={localData.temperature}
              onChange={(e) => handleChange('temperature', e.target.value)}
              readOnly
            />
            <div className="flex flex-col border border-l-0 border-gray-300 rounded-r-md">
              <button
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => handleTemperatureStep('up')}
              >
                <ChevronUp size={14} />
              </button>
              <button
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => handleTemperatureStep('down')}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LLMNode);
