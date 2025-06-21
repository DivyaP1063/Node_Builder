
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG)"""
    if not nodes or not edges:
        return True
    
    # Create adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph and edge.target in graph:
            graph[edge.source].append(edge.target)
    
    # Use DFS to detect cycles
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node.id: WHITE for node in nodes}
    
    def has_cycle(node_id):
        if color[node_id] == GRAY:
            return True
        if color[node_id] == BLACK:
            return False
        
        color[node_id] = GRAY
        for neighbor in graph[node_id]:
            if has_cycle(neighbor):
                return True
        
        color[node_id] = BLACK
        return False
    
    # Check for cycles starting from each unvisited node
    for node in nodes:
        if color[node.id] == WHITE:
            if has_cycle(node.id):
                return False
    
    return True

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    """Parse the pipeline and return analysis"""
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result
    }

@app.get("/")
async def root():
    return {"message": "VectorShift Pipeline Backend"}
