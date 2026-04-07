import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

function createFrame(
  array: number[],
  highlighted: number[] = [],
  comparisons: number[] = [],
  message?: string,
  stats?: { comparisons: number }
): VisualizationFrame {
  return {
    array: [...array],
    highlighted,
    comparisons,
    message,
    stats: stats ? { comparisons: stats.comparisons, swaps: 0 } : undefined,
  };
}

export function* linearSearch(
  array: number[],
  target: number
): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array];
  let comparisons = 0;
  let found = false;
  let foundIndex = -1;

  yield createFrame(arr, [], [], `Searching for ${target}...`, { comparisons });

  for (let i = 0; i < arr.length; i++) {
    comparisons++;

    yield createFrame(
      arr,
      [i],
      [i],
      `Checking position ${i}: ${arr[i]}`,
      { comparisons }
    );

    if (arr[i] === target) {
      found = true;
      foundIndex = i;

      yield createFrame(
        arr,
        [i],
        [],
        `Found ${target} at index ${i}!`,
        { comparisons }
      );

      break;
    }
  }

  if (!found) {
    yield createFrame(arr, [], [], `Target ${target} not found in array`, {
      comparisons,
    });
  }

  return {
    steps: [],
    stats: {
      totalComparisons: comparisons,
      totalSwaps: 0,
      executionTime: 0,
    },
    completed: true,
  };
}

export function* binarySearch(
  array: number[],
  target: number
): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array].sort((a, b) => a - b); // Binary search requires sorted array
  let comparisons = 0;
  let found = false;
  let foundIndex = -1;

  yield createFrame(arr, [], [], `Searching for ${target} in sorted array...`, {
    comparisons,
  });

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    yield createFrame(
      arr,
      [mid],
      [left, mid, right],
      `Checking mid=${arr[mid]} at index ${mid}`,
      { comparisons }
    );

    if (arr[mid] === target) {
      found = true;
      foundIndex = mid;

      yield createFrame(
        arr,
        [mid],
        [],
        `Found ${target} at index ${mid}!`,
        { comparisons }
      );

      break;
    } else if (arr[mid] < target) {
      yield createFrame(
        arr,
        [mid],
        [mid + 1, right],
        `${arr[mid]} < ${target}, search right half`,
        { comparisons }
      );

      left = mid + 1;
    } else {
      yield createFrame(
        arr,
        [mid],
        [left, mid - 1],
        `${arr[mid]} > ${target}, search left half`,
        { comparisons }
      );

      right = mid - 1;
    }
  }

  if (!found) {
    yield createFrame(arr, [], [], `Target ${target} not found in array`, {
      comparisons,
    });
  }

  return {
    steps: [],
    stats: {
      totalComparisons: comparisons,
      totalSwaps: 0,
      executionTime: 0,
    },
    completed: true,
  };
}
