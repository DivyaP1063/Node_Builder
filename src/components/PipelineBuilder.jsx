import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import NodeSidebar from "./NodeSidebar";
import { nodeTypes } from "./nodes/nodeTypes";

const initialNodes = [];
const initialEdges = [];

const createNodeTypeWithDelete = (NodeComponent) => (props) =>
  <NodeComponent {...props} onDelete={() => props.data.onDelete()} />;

const nodeTypesWithDelete = Object.fromEntries(
  Object.entries(nodeTypes).map(([key, comp]) => [
    key,
    createNodeTypeWithDelete(comp),
  ])
);

const getDefaultData = (nodeType) => {
  const defaultDataMap = {
    input: {
      label: "Input Node",
      inputName: "input_0",
      inputType: "string",
    },
    output: {
      label: "Output Node",
      outputName: "output_0",
      outputFormat: "JSON",
    },
    text: { label: "Text Node", textContent: "Enter your text here..." },
    llm: {
      label: "LLM Node",
      model: "gpt-4",
      temperature: 0.7,
      systemInstruction: "You are a helpful assistant.",
      prompt: "Enter your prompt here...",
      usePersonalKey: false,
    },
  };

  return defaultDataMap[nodeType] || { label: `${nodeType} node` };
};

const PipelineBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  const createNode = useCallback((nodeType, position) => {
    const nodeId = `${nodeType}-${Date.now()}`;
    return {
      id: nodeId,
      type: nodeType,
      position,
      data: getDefaultData(nodeType),
    };
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - (isSidebarOpen ? 300 : 50),
        y: event.clientY - 100,
      };

      const newNode = createNode(type, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, isSidebarOpen, createNode]
  );

  const addNode = useCallback(
    (nodeType) => {
      const position = {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
      };
      const newNode = createNode(nodeType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, createNode]
  );

  const nodesWithDeleteHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onDelete: () => deleteNode(node.id),
    },
  }));

  const handleSubmit = async () => {
    try {
      const pipeline = { nodes, edges };
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pipeline),
      });

      if (!response.ok) throw new Error("Failed to submit pipeline");
      const result = await response.json();

      alert(
        `Pipeline Analysis:\nNumber of nodes: ${
          result.num_nodes
        }\nNumber of edges: ${result.num_edges}\nIs DAG: ${
          result.is_dag ? "Yes" : "No"
        }`
      );
      toast({
        title: "Pipeline Submitted",
        description: `Pipeline with ${result.num_nodes} nodes and ${result.num_edges} edges submitted successfully.`,
      });
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      toast({
        title: "Error",
        description: "Failed to submit pipeline.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex">
      <NodeSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNodeAdd={addNode}
      />

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Pipeline Builder
            </h1>
            <p className="text-sm text-gray-500">
              Build and configure your data processing pipeline
            </p>
          </div>
          <Button onClick={handleSubmit} size="sm">
            <Play className="w-4 h-4 mr-2" />
            Submit Pipeline
          </Button>
        </div>

        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodesWithDeleteHandlers}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypesWithDelete}
            fitView
            className="bg-gray-50"
          >
            <Background color="#aaa" gap={16} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default PipelineBuilder;
