import { useState, useCallback, useRef } from 'react';
import { VisualizationState, VisualizationFrame, AlgorithmResult } from '@/lib/types';

interface UseAlgorithmRunnerOptions {
  initialSpeed?: number;
}

export function useAlgorithmRunner(options: UseAlgorithmRunnerOptions = {}) {
  const { initialSpeed = 1 } = options;

  const [state, setState] = useState<VisualizationState>({
    step: 0,
    isRunning: false,
    isPaused: false,
    speed: initialSpeed,
    currentArray: [],
    highlightedIndices: [],
    history: [],
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const generatorRef = useRef<Generator<VisualizationFrame, AlgorithmResult> | null>(null);

  const startAnimation = useCallback(
    (generator: Generator<VisualizationFrame, AlgorithmResult>) => {
      generatorRef.current = generator;
      setState((prev) => ({
        ...prev,
        isRunning: true,
        isPaused: false,
      }));

      const executeStep = () => {
        if (!generatorRef.current) return;

        const result = generatorRef.current.next();

        if (!result.done) {
          const frame = result.value as VisualizationFrame;
          setState((prev) => ({
            ...prev,
            step: prev.step + 1,
            currentArray: frame.array || prev.currentArray,
            highlightedIndices: frame.highlighted || [],
            comparisonIndices: frame.comparisons,
            swappedIndices: frame.swaps,
            message: frame.message,
            history: [...prev.history, frame],
          }));

          // Calculate delay based on speed
          const baseDelay = 300 / state.speed;
          timeoutRef.current = setTimeout(executeStep, baseDelay);
        } else {
          setState((prev) => ({
            ...prev,
            isRunning: false,
          }));
        }
      };

      executeStep();
    },
    [state.speed]
  );

  const pause = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: true,
    }));
  }, []);

  const resume = useCallback(() => {
    if (state.isPaused && generatorRef.current) {
      setState((prev) => ({
        ...prev,
        isRunning: true,
        isPaused: false,
      }));

      const executeStep = () => {
        if (!generatorRef.current) return;

        const result = generatorRef.current.next();

        if (!result.done) {
          const frame = result.value as VisualizationFrame;
          setState((prev) => ({
            ...prev,
            step: prev.step + 1,
            currentArray: frame.array || prev.currentArray,
            highlightedIndices: frame.highlighted || [],
            comparisonIndices: frame.comparisons,
            swappedIndices: frame.swaps,
            message: frame.message,
            history: [...prev.history, frame],
          }));

          const baseDelay = 300 / state.speed;
          timeoutRef.current = setTimeout(executeStep, baseDelay);
        } else {
          setState((prev) => ({
            ...prev,
            isRunning: false,
          }));
        }
      };

      executeStep();
    }
  }, [state.isPaused, state.speed]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    generatorRef.current = null;
    setState({
      step: 0,
      isRunning: false,
      isPaused: false,
      speed: initialSpeed,
      currentArray: [],
      highlightedIndices: [],
      history: [],
    });
  }, [initialSpeed]);

  const setSpeed = useCallback((speed: number) => {
    setState((prev) => ({
      ...prev,
      speed: Math.max(0.25, Math.min(2, speed)),
    }));
  }, []);

  const nextStep = useCallback(() => {
    if (generatorRef.current && state.isPaused) {
      const result = generatorRef.current.next();

      if (!result.done) {
        const frame = result.value as VisualizationFrame;
        setState((prev) => ({
          ...prev,
          step: prev.step + 1,
          currentArray: frame.array || prev.currentArray,
          highlightedIndices: frame.highlighted || [],
          comparisonIndices: frame.comparisons,
          swappedIndices: frame.swaps,
          message: frame.message,
          history: [...prev.history, frame],
        }));
      }
    }
  }, [state.isPaused]);

  return {
    state,
    startAnimation,
    pause,
    resume,
    reset,
    setSpeed,
    nextStep,
  };
}
