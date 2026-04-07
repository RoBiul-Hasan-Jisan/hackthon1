'use client';

import { useState, useEffect } from 'react';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  visited?: boolean;
}

interface GraphEdge {
  from: number;
  to: number;
  visited?: boolean;
}

interface GraphVisualizerProps {
  nodes?: number;
  algorithmId: string;
}

export default function GraphVisualizer({
  nodes = 6,
  algorithmId,
}: GraphVisualizerProps) {
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [visitedOrder, setVisitedOrder] = useState<number[]>([]);

  useEffect(() => {
    // Create sample graph
    const radius = 80;
    const centerX = 150;
    const centerY = 150;

    const newNodes: GraphNode[] = Array.from({ length: nodes }, (_, i) => ({
      id: i,
      x: centerX + radius * Math.cos((2 * Math.PI * i) / nodes),
      y: centerY + radius * Math.sin((2 * Math.PI * i) / nodes),
      visited: false,
    }));

    setGraphNodes(newNodes);

    // Create sample edges (simple connected graph)
    const newEdges: GraphEdge[] = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
    ];

    setEdges(newEdges);
  }, [nodes]);

  return (
    <div className="flex flex-col gap-4">
      {/* Canvas */}
      <div className="bg-secondary rounded-lg border border-border p-6 flex items-center justify-center" style={{ height: '400px' }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Draw edges */}
          {edges.map((edge, idx) => {
            const fromNode = graphNodes.find(n => n.id === edge.from);
            const toNode = graphNodes.find(n => n.id === edge.to);

            if (!fromNode || !toNode) return null;

            return (
              <line
                key={`edge-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={edge.visited ? '#10b981' : '#2d3748'}
                strokeWidth="2"
              />
            );
          })}

          {/* Draw nodes */}
          {graphNodes.map((node) => (
            <g key={`node-${node.id}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={node.visited ? '#10b981' : '#3b82f6'}
                className="transition-all"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Info */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold mb-2">Graph Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Nodes</p>
            <p className="font-bold text-primary">{graphNodes.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Edges</p>
            <p className="font-bold text-primary">{edges.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Algorithm</p>
            <p className="font-bold text-accent capitalize">{algorithmId.replace('-', ' ')}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Visited</p>
            <p className="font-bold text-accent">{visitedOrder.length}</p>
          </div>
        </div>
        {visitedOrder.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Traversal Order</p>
            <div className="flex flex-wrap gap-2">
              {visitedOrder.map((nodeId) => (
                <span key={nodeId} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                  {nodeId}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
