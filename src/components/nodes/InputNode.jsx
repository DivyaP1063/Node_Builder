
import React, { useState } from 'react';
import { Database } from 'lucide-react';
import BaseNode from './BaseNode';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const InputNode = ({ data, onDelete }) => {
  const [inputName, setInputName] = useState(data.inputName || 'input_0');
  const [inputType, setInputType] = useState(data.inputType || 'string');

  const config = {
    label: 'Input',
    icon: Database,
    color: 'bg-blue-500',
    outputs: [{ id: 'output', label: 'Data Output' }],
    content: (
      <div className="space-y-3">
        <div>
          <Label htmlFor="input-name" className="text-xs text-gray-600">Input Name</Label>
          <Input 
            id="input-name" 
            placeholder="Enter input name" 
            className="mt-1"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="input-type" className="text-xs text-gray-600">Data Type</Label>
          <Input 
            id="input-type" 
            placeholder="e.g., string, number" 
            className="mt-1"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          />
        </div>
      </div>
    )
  };

  return <BaseNode data={data} config={config} onDelete={onDelete} />;
};

export default InputNode;
