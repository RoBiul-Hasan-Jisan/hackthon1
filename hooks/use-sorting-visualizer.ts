import { useState, useCallback } from 'react';
import { VisualizationFrame } from '@/lib/types';

export interface SortingState {
  array: number[];
  highlightedIndices: number[];
  comparisonIndices: number[];
  swappedIndices: number[];
  isSorted: boolean;
  stats: {
    comparisons: number;
    swaps: number;
    arrayAccesses: number;
  };
}

export function useSortingVisualizer(initialArray: number[]) {
  const [state, setState] = useState<SortingState>({
    array: initialArray,
    highlightedIndices: [],
    comparisonIndices: [],
    swappedIndices: [],
    isSorted: false,
    stats: {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
    },
  });

  const reset = useCallback(() => {
    setState({
      array: initialArray,
      highlightedIndices: [],
      comparisonIndices: [],
      swappedIndices: [],
      isSorted: false,
      stats: {
        comparisons: 0,
        swaps: 0,
        arrayAccesses: 0,
      },
    });
  }, [initialArray]);

  const updateFrame = useCallback((frame: VisualizationFrame) => {
    setState((prev) => ({
      array: frame.array || prev.array,
      highlightedIndices: frame.highlighted || [],
      comparisonIndices: frame.comparisons || [],
      swappedIndices: frame.swaps || [],
      isSorted: frame.array ? isArraySorted(frame.array) : prev.isSorted,
      stats: {
        comparisons: frame.stats?.comparisons || prev.stats.comparisons,
        swaps: frame.stats?.swaps || prev.stats.swaps,
        arrayAccesses: prev.stats.arrayAccesses + 1,
      },
    }));
  }, []);

  const setHighlighted = useCallback((indices: number[]) => {
    setState((prev) => ({
      ...prev,
      highlightedIndices: indices,
    }));
  }, []);

  const setComparisons = useCallback((indices: number[]) => {
    setState((prev) => ({
      ...prev,
      comparisonIndices: indices,
    }));
  }, []);

  const setSwaps = useCallback((indices: number[]) => {
    setState((prev) => ({
      ...prev,
      swappedIndices: indices,
    }));
  }, []);

  return {
    state,
    reset,
    updateFrame,
    setHighlighted,
    setComparisons,
    setSwaps,
  };
}

function isArraySorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) return false;
  }
  return true;
}
