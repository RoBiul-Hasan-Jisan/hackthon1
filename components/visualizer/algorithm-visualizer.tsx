'use client';

import { useState } from 'react';
import { algorithms } from '@/lib/algorithms/algorithms-metadata';
import VisualizerControls from './visualizer-controls';
import VisualizerDisplay from './visualizer-display';
import CodeExplorer from './code-explorer';
import ComplexityInfo from './complexity-info';

interface AlgorithmVisualizerProps {
  algorithmId: string;
}

export default function AlgorithmVisualizer({
  algorithmId,
}: AlgorithmVisualizerProps) {
  const algorithm = algorithms.find((a) => a.id === algorithmId);
  const [isRunning, setIsRunning] = useState(false);

  if (!algorithm) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Algorithm not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{algorithm.name}</h1>
        <p className="text-muted-foreground mt-2">{algorithm.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {/* Main Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-card rounded-lg border border-border p-6 max-h-96 overflow-hidden">
            <VisualizerDisplay algorithmId={algorithmId} />
          </div>

          {/* Controls */}
          <VisualizerControls
            algorithmId={algorithmId}
            isRunning={isRunning}
            onRunningChange={setIsRunning}
          />
        </div>

        {/* Sidebar - Info & Code */}
        <div className="flex flex-col gap-6">
          <ComplexityInfo algorithm={algorithm} />
          <CodeExplorer algorithm={algorithm} />
        </div>
      </div>
    </div>
  );
}
