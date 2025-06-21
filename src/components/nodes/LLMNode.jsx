
import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import BaseNode from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

const LLMNode = ({ data, onDelete }) => {
  const [selectedModel, setSelectedModel] = useState(data.model || 'gpt-4');
  const [temperature, setTemperature] = useState([data.temperature || 0.7]);
  const [systemInstruction, setSystemInstruction] = useState(data.systemInstruction || 'You are a helpful assistant.');
  const [prompt, setPrompt] = useState(data.prompt || 'Enter your prompt here...');
  const [usePersonalKey, setUsePersonalKey] = useState(data.usePersonalKey || false);

  const config = {
    label: 'LLM',
    icon: Zap,
    color: 'bg-orange-500',
    inputs: [
      { id: 'prompt', label: 'Prompt' },
      { id: 'context', label: 'Context' }
    ],
    outputs: [{ id: 'response', label: 'Response' }],
    content: (
      <div className="space-y-3">
        <div>
          <Label htmlFor="model-select" className="text-xs text-gray-600">Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="temperature" className="text-xs text-gray-600">Temperature: {temperature[0]}</Label>
          <Slider 
            value={temperature} 
            onValueChange={setTemperature}
            max={1} 
            min={0} 
            step={0.1} 
            className="mt-2" 
          />
        </div>
        <div>
          <Label htmlFor="system-instruction" className="text-xs text-gray-600">System Instruction</Label>
          <textarea
            id="system-instruction"
            placeholder="Enter system instruction..."
            value={systemInstruction}
            onChange={(e) => setSystemInstruction(e.target.value)}
            className="mt-1 min-h-[60px] resize-y w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <Label htmlFor="prompt" className="text-xs text-gray-600">Prompt</Label>
          <textarea
            id="prompt"
            placeholder="Enter prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 min-h-[60px] resize-y w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="use-personal-key"
            checked={usePersonalKey}
            onChange={(e) => setUsePersonalKey(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="use-personal-key" className="text-xs text-gray-600">Use Personal Key</Label>
        </div>
      </div>
    )
  };

  return <BaseNode data={data} config={config} onDelete={onDelete} />;
};

export default LLMNode;
