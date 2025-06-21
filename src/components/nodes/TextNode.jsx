
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import BaseNode from './BaseNode';

const TextNode = ({ data, onDelete }) => {
  const [text, setText] = useState(data.textContent || 'Enter your text here...');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 'auto' });
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{variable}})
  const variables = text.match(/\{\{\s*(\w+)\s*\}\}/g) || [];
  const uniqueVariables = [...new Set(variables.map(v => v.replace(/[{}]/g, '').trim()))];

  // Auto-resize textarea and node
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      
      // Update node size based on content
      const newWidth = Math.max(200, Math.min(400, text.length * 8 + 100));
      setNodeSize({
        width: newWidth,
        height: 'auto'
      });
    }
  }, [text]);

  const config = {
    label: 'Text',
    icon: MessageSquare,
    color: 'bg-purple-500',
    inputs: uniqueVariables.map(variable => ({ id: variable, label: variable })),
    outputs: [{ id: 'output', label: 'Text Output' }],
    className: 'transition-all duration-200',
    content: (
      <div className="space-y-3" style={{ width: nodeSize.width - 40 }}>
        <div>
          <label htmlFor="text-content" className="text-xs text-gray-600 block mb-1">Text Content</label>
          <textarea
            ref={textareaRef}
            id="text-content"
            placeholder="Enter text content... Use {{variable}} for dynamic inputs"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[80px] resize-none p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            style={{ overflow: 'hidden' }}
          />
        </div>
        {uniqueVariables.length > 0 && (
          <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded">
            <strong>Variables detected:</strong> {uniqueVariables.join(', ')}
            <div className="text-gray-500 mt-1">Input handles created on the left</div>
          </div>
        )}
      </div>
    )
  };

  return (
    <div style={{ width: nodeSize.width }}>
      <BaseNode data={data} config={config} onDelete={onDelete} />
    </div>
  );
};

export default TextNode;
