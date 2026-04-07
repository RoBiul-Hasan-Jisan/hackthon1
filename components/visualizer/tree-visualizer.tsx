'use client';

import { useState, useEffect } from 'react';

interface TreeNodeData {
  id: number;
  value: number;
  x: number;
  y: number;
  visited?: boolean;
  left?: number;
  right?: number;
}

interface TreeVisualizerProps {
  algorithmId: string;
  traversalOrder?: number[];
}

export default function TreeVisualizer({
  algorithmId,
  traversalOrder = [],
}: TreeVisualizerProps) {
  const [nodes, setNodes] = useState<TreeNodeData[]>([]);

  useEffect(() => {
    // Create a sample BST visualization
    const sampleNodes: TreeNodeData[] = [
      { id: 0, value: 50, x: 200, y: 40, left: 1, right: 2 },
      { id: 1, value: 30, x: 100, y: 120, left: 3, right: 4 },
      { id: 2, value: 70, x: 300, y: 120, left: 5, right: 6 },
      { id: 3, value: 20, x: 50, y: 200 },
      { id: 4, value: 40, x: 150, y: 200 },
      { id: 5, value: 60, x: 250, y: 200 },
      { id: 6, value: 80, x: 350, y: 200 },
    ];

    // Mark visited nodes based on traversal order
    const visitedSet = new Set(traversalOrder);
    const updatedNodes = sampleNodes.map(n => ({
      ...n,
      visited: visitedSet.has(n.id),
    }));

    setNodes(updatedNodes);
  }, [traversalOrder]);

  const drawEdges = () => {
    const lines: JSX.Element[] = [];

    nodes.forEach(node => {
      if (node.left !== undefined) {
        const leftNode = nodes.find(n => n.id === node.left);
        if (leftNode) {
          lines.push(
            <line
              key={`edge-${node.id}-${leftNode.id}`}
              x1={node.x}
              y1={node.y}
              x2={leftNode.x}
              y2={leftNode.y}
              stroke="#2d3748"
              strokeWidth="2"
            />
          );
        }
      }

      if (node.right !== undefined) {
        const rightNode = nodes.find(n => n.id === node.right);
        if (rightNode) {
          lines.push(
            <line
              key={`edge-${node.id}-${rightNode.id}`}
              x1={node.x}
              y1={node.y}
              x2={rightNode.x}
              y2={rightNode.y}
              stroke="#2d3748"
              strokeWidth="2"
            />
          );
        }
      }
    });

    return lines;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Canvas */}
      <div className="bg-secondary rounded-lg border border-border p-6 flex items-center justify-center overflow-x-auto" style={{ height: '350px' }}>
        <svg width="400" height="280" viewBox="0 0 400 280">
          {drawEdges()}

          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={`node-${node.id}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={node.visited ? '#10b981' : '#3b82f6'}
                className="transition-all"
              />
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {node.value}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Info */}
      <div className="bg-card rounded-lg border border-border p-4 space-y-3">
        <h3 className="font-semibold">Tree Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Algorithm</p>
            <p className="font-bold text-primary capitalize">{algorithmId.split('-').pop()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Nodes Count</p>
            <p className="font-bold text-primary">{nodes.length}</p>
          </div>
        </div>

        {traversalOrder.length > 0 && (
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-2">
              {algorithmId.includes('inorder')
                ? 'Inorder (Left, Root, Right)'
                : algorithmId.includes('preorder')
                ? 'Preorder (Root, Left, Right)'
                : algorithmId.includes('postorder')
                ? 'Postorder (Left, Right, Root)'
                : 'Level Order'}
            </p>
            <div className="flex flex-wrap gap-2">
              {traversalOrder.map((nodeId, idx) => (
                <span key={idx} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                  {nodes.find(n => n.id === nodeId)?.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
