'use client';

import { useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface VisualizerControlsProps {
  algorithmId: string;
  isRunning: boolean;
  onRunningChange: (running: boolean) => void;
}

export default function VisualizerControls({
  algorithmId,
  isRunning,
  onRunningChange,
}: VisualizerControlsProps) {
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold">Array Size</label>
          <span className="text-xs text-muted-foreground">{arraySize} elements</span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold">Speed</label>
          <span className="text-xs text-muted-foreground">{speed.toFixed(2)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onRunningChange(!isRunning)}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Play
            </>
          )}
        </button>
        <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors hover:text-accent">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm">
          <SkipBack className="w-4 h-4" /> Step Back
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm">
          Step Forward <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
