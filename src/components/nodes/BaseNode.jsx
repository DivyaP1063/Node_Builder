import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { X } from 'lucide-react';

const BaseNode = ({ data, config, children, onDelete }) => {
  const { label, icon: Icon, color, inputs = [], outputs = [], content, className } = config;

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow min-w-[200px] relative ${className || ''}`}>
      {/* Close Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-10 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ 
            top: 60 + index * 25,
            left: -8,
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: '2px solid #555'
          }}
        />
      ))}

      {/* Node Header */}
      <div className={`px-4 py-3 rounded-t-lg flex items-center gap-2 ${color}`}>
        {Icon && <Icon className="w-4 h-4 text-white" />}
        <span className="text-sm font-medium text-white">{data.label || label}</span>
      </div>

      {/* Node Content */}
      <div className="p-4">
        {content}
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ 
            top: 60 + index * 25,
            right: -8,
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: '2px solid #555'
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
