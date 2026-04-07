'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { VisualizationFrame } from '@/lib/types';
import { getAlgorithm } from '@/lib/algorithms';
import { Play, Pause } from 'lucide-react';

interface VisualizerDisplayProps {
  algorithmId: string;
}

export default function VisualizerDisplay({
  algorithmId,
}: VisualizerDisplayProps) {
  const [currentFrame, setCurrentFrame] = useState<VisualizationFrame | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const frameIndex = useRef(0);
  const frames = useRef<VisualizationFrame[]>([]);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const arrayRef = useRef<number[]>([]);

  // Initialize visualization on component mount and when algorithmId changes
  useEffect(() => {
    const initializeVisualization = () => {
      // Generate random array for visualization
      const arraySize = 20;
      const randomArray = Array.from({ length: arraySize }, () =>
        Math.floor(Math.random() * 100) + 1
      );
      arrayRef.current = randomArray;

      // Get algorithm and generate frames
      const algorithm = getAlgorithm(algorithmId);
      if (!algorithm) {
        console.log('[v0] Algorithm not found:', algorithmId);
        return;
      }

      const generator = algorithm(randomArray);
      const allFrames: VisualizationFrame[] = [];

      try {
        for (const frame of generator) {
          allFrames.push(frame);
        }
      } catch (error) {
        console.log('[v0] Error generating frames:', error);
      }

      frames.current = allFrames;
      frameIndex.current = 0;
      if (allFrames.length > 0) {
        setCurrentFrame(allFrames[0]);
      }
      setIsRunning(false);
    };

    initializeVisualization();
  }, [algorithmId]);

  // Animation loop
  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      return;
    }

    const animate = () => {
      if (frameIndex.current < frames.current.length - 1) {
        frameIndex.current++;
        setCurrentFrame(frames.current[frameIndex.current]);
        
        // Calculate delay based on speed (faster speed = shorter delay)
        const baseDelay = 200 / speed;
        animationRef.current = setTimeout(animate, baseDelay);
      } else {
        setIsRunning(false);
      }
    };

    const baseDelay = 200 / speed;
    animationRef.current = setTimeout(animate, baseDelay);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning, speed]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    frameIndex.current = 0;
    if (frames.current.length > 0) {
      setCurrentFrame(frames.current[0]);
    }
  }, []);

  const handlePrevious = useCallback(() => {
    setIsRunning(false);
    if (frameIndex.current > 0) {
      frameIndex.current--;
      setCurrentFrame(frames.current[frameIndex.current]);
    }
  }, []);

  const handleNext = useCallback(() => {
    setIsRunning(false);
    if (frameIndex.current < frames.current.length - 1) {
      frameIndex.current++;
      setCurrentFrame(frames.current[frameIndex.current]);
    }
  }, []);

  if (!currentFrame || !currentFrame.array) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-96 gap-4">
        <div className="text-5xl font-bold text-primary/20">█ █ █ █ █</div>
        <p className="text-muted-foreground text-center">
          Loading {algorithmId}...
        </p>
      </div>
    );
  }

  const maxValue = Math.max(...(currentFrame.array || []));
  const containerHeight = 300;
  const barWidth = Math.max(2, Math.floor(600 / currentFrame.array.length));
  const totalSteps = frames.current.length;
  const currentStep = frameIndex.current + 1;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Visualization Canvas */}
      <div className="flex items-end justify-center gap-1 p-6 bg-secondary rounded-lg min-h-96 overflow-x-auto">
        {currentFrame.array.map((value, index) => {
          const isHighlighted = currentFrame.highlighted?.includes(index);
          const isComparison = currentFrame.comparisons?.includes(index);
          const isSwapped = currentFrame.swaps?.includes(index);

          let color = 'bg-primary';
          if (isSwapped) color = 'bg-destructive';
          else if (isComparison) color = 'bg-accent';
          else if (isHighlighted) color = 'bg-primary/80';

          const height = (value / maxValue) * containerHeight;

          return (
            <div
              key={index}
              className={`${color} rounded-sm transition-all duration-100`}
              style={{
                height: `${height}px`,
                width: `${barWidth}px`,
                minWidth: `${barWidth}px`,
              }}
              title={`Value: ${value}`}
            />
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-secondary rounded-lg h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-card p-3 rounded-lg border border-border">
          <div className="text-xs text-muted-foreground">Comparisons</div>
          <div className="text-lg font-bold text-primary">
            {currentFrame.stats?.comparisons || 0}
          </div>
        </div>
        <div className="bg-card p-3 rounded-lg border border-border">
          <div className="text-xs text-muted-foreground">Swaps</div>
          <div className="text-lg font-bold text-accent">
            {currentFrame.stats?.swaps || 0}
          </div>
        </div>
        <div className="bg-card p-3 rounded-lg border border-border">
          <div className="text-xs text-muted-foreground">Speed</div>
          <div className="text-lg font-bold text-foreground">
            {speed.toFixed(2)}x
          </div>
        </div>
      </div>

      {/* Message */}
      {currentFrame.message && (
        <div className="bg-card p-4 rounded-lg border border-border text-sm text-muted-foreground text-center">
          {currentFrame.message}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
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
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm"
        >
          Reset
        </button>
        <button
          onClick={handlePrevious}
          className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm"
        >
          Next →
        </button>
        <div className="ml-auto flex items-center gap-3">
          <label className="text-xs text-muted-foreground">Speed:</label>
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
