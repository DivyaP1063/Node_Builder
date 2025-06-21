
import React, { useState } from 'react';
import { Database } from 'lucide-react';
import BaseNode from './BaseNode';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const OutputNode = ({ data, onDelete }) => {
  const [outputName, setOutputName] = useState(data.outputName || 'data_output');
  const [outputFormat, setOutputFormat] = useState(data.outputFormat || 'JSON');

  const config = {
    label: 'Output',
    icon: Database,
    color: 'bg-green-500',
    inputs: [{ id: 'input', label: 'Input' }],
    // No outputs for the final output node
    content: (
      <div className="space-y-3">
        <div>
          <Label htmlFor="output-name" className="text-xs text-gray-600">Output Name</Label>
          <Input 
            id="output-name" 
            placeholder="Enter output name" 
            className="mt-1"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="output-format" className="text-xs text-gray-600">Format</Label>
          <Input 
            id="output-format" 
            placeholder="e.g., JSON, CSV" 
            className="mt-1"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          />
        </div>
      </div>
    )
  };

  return <BaseNode data={data} config={config} onDelete={onDelete} />;
};

export default OutputNode;
