import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Database, MessageSquare, Zap } from 'lucide-react';

const NodeSidebar = ({ isOpen, onToggle, onNodeAdd }) => {
  const nodeCategories = [
    {
      title: "Data Sources",
      nodes: [
        { type: "input", label: "Input", icon: Database, description: "Data input node" },
      ]
    },
    {
      title: "Processing",
      nodes: [
        { type: "text", label: "Text", icon: MessageSquare, description: "Text processing with variables" },
        { type: "llm", label: "LLM", icon: Zap, description: "Language model node" },
      ]
    },
    {
      title: "Outputs",
      nodes: [
        { type: "output", label: "Output", icon: Database, description: "Data output node" },
      ]
    }
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleNodeClick = (nodeType) => {
    onNodeAdd(nodeType);
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${isOpen ? "w-80" : "w-12"}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isOpen && (
          <h2 className="text-lg font-semibold text-gray-900">Components</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {nodeCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-sm font-medium text-gray-700 mb-3">{category.title}</h3>
              <div className="space-y-2">
                {category.nodes.map((node, nodeIndex) => (
                  <div
                    key={nodeIndex}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors"
                    draggable
                    onDragStart={(event) => onDragStart(event, node.type)}
                    onClick={() => handleNodeClick(node.type)}
                  >
                    <div className="flex items-center gap-3">
                      <node.icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{node.label}</div>
                        <div className="text-xs text-gray-500">{node.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NodeSidebar;
