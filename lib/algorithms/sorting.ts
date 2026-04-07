import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

// Helper function to create a frame
function createFrame(
  array: number[],
  highlighted: number[] = [],
  comparisons: number[] = [],
  swaps: number[] = [],
  message?: string,
  stats?: { comparisons: number; swaps: number }
): VisualizationFrame {
  return {
    array: [...array],
    highlighted,
    comparisons,
    swaps,
    message,
    stats,
  };
}

export function* bubbleSort(array: number[]): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight comparison
      yield createFrame(
        arr,
        [j, j + 1],
        [j, j + 1],
        [],
        `Comparing arr[${j}] and arr[${j + 1}]`,
        { comparisons, swaps }
      );

      comparisons++;

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;

        yield createFrame(
          arr,
          [j, j + 1],
          [],
          [j, j + 1],
          `Swapped arr[${j}] and arr[${j + 1}]`,
          { comparisons, swaps }
        );
      }
    }

    // Mark sorted elements
    const sortedIndices = Array.from({ length: i + 1 }, (_, k) => n - 1 - k);
    yield createFrame(
      arr,
      sortedIndices,
      [],
      [],
      `Pass ${i + 1} complete. ${i + 1} elements sorted.`,
      { comparisons, swaps }
    );
  }

  yield createFrame(arr, Array.from({ length: n }, (_, i) => i), [], [], 'Sorting complete!', {
    comparisons,
    swaps,
  });

  return {
    steps: [],
    stats: { totalComparisons: comparisons, totalSwaps: swaps, executionTime: 0 },
    completed: true,
  };
}

export function* quickSort(array: number[]): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  function* quickSortHelper(
    low: number,
    high: number
  ): Generator<VisualizationFrame, void> {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    }
  }

  function* partition(low: number, high: number): Generator<VisualizationFrame, number> {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      yield createFrame(
        arr,
        [j, high],
        [j, high],
        [],
        `Comparing ${arr[j]} with pivot ${pivot}`,
        { comparisons, swaps }
      );

      comparisons++;

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;

        yield createFrame(
          arr,
          [i, j],
          [],
          [i, j],
          `Swapped positions`,
          { comparisons, swaps }
        );
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;

    yield createFrame(
      arr,
      [i + 1],
      [],
      [i + 1, high],
      `Pivot positioned at index ${i + 1}`,
      { comparisons, swaps }
    );

    return i + 1;
  }

  yield* quickSortHelper(0, arr.length - 1);

  yield createFrame(
    arr,
    Array.from({ length: arr.length }, (_, i) => i),
    [],
    [],
    'Sorting complete!',
    { comparisons, swaps }
  );

  return {
    steps: [],
    stats: { totalComparisons: comparisons, totalSwaps: swaps, executionTime: 0 },
    completed: true,
  };
}

export function* mergeSort(array: number[]): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  function* mergeSortHelper(
    low: number,
    high: number
  ): Generator<VisualizationFrame, void> {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      yield* mergeSortHelper(low, mid);
      yield* mergeSortHelper(mid + 1, high);
      yield* merge(low, mid, high);
    }
  }

  function* merge(low: number, mid: number, high: number): Generator<VisualizationFrame, void> {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    let i = 0,
      j = 0,
      k = low;

    while (i < left.length && j < right.length) {
      comparisons++;

      yield createFrame(
        arr,
        [low + i, mid + 1 + j],
        [low + i, mid + 1 + j],
        [],
        `Comparing ${left[i]} and ${right[j]}`,
        { comparisons, swaps }
      );

      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }

      swaps++;

      yield createFrame(arr, [k - 1], [], [k - 1], 'Merged element', {
        comparisons,
        swaps,
      });
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      swaps++;
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      swaps++;
    }

    yield createFrame(
      arr,
      Array.from({ length: high - low + 1 }, (_, i) => low + i),
      [],
      [],
      `Merged range [${low}, ${high}]`,
      { comparisons, swaps }
    );
  }

  yield* mergeSortHelper(0, arr.length - 1);

  yield createFrame(
    arr,
    Array.from({ length: arr.length }, (_, i) => i),
    [],
    [],
    'Sorting complete!',
    { comparisons, swaps }
  );

  return {
    steps: [],
    stats: { totalComparisons: comparisons, totalSwaps: swaps, executionTime: 0 },
    completed: true,
  };
}

export function* insertionSort(array: number[]): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    yield createFrame(
      arr,
      [i],
      [],
      [],
      `Inserting element ${key}`,
      { comparisons, swaps }
    );

    while (j >= 0 && arr[j] > key) {
      comparisons++;

      yield createFrame(
        arr,
        [j, i],
        [j, i],
        [],
        `Comparing ${arr[j]} with ${key}`,
        { comparisons, swaps }
      );

      arr[j + 1] = arr[j];
      swaps++;

      yield createFrame(
        arr,
        [j, j + 1],
        [],
        [j, j + 1],
        'Shifted element',
        { comparisons, swaps }
      );

      j--;
    }

    arr[j + 1] = key;
    swaps++;

    yield createFrame(
      arr,
      Array.from({ length: i + 1 }, (_, k) => k),
      [],
      [],
      `Inserted ${key} at position ${j + 1}`,
      { comparisons, swaps }
    );
  }

  yield createFrame(
    arr,
    Array.from({ length: arr.length }, (_, i) => i),
    [],
    [],
    'Sorting complete!',
    { comparisons, swaps }
  );

  return {
    steps: [],
    stats: { totalComparisons: comparisons, totalSwaps: swaps, executionTime: 0 },
    completed: true,
  };
}

export function* selectionSort(array: number[]): Generator<VisualizationFrame, AlgorithmResult> {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;

      yield createFrame(
        arr,
        [j, minIdx],
        [j, minIdx],
        [],
        `Comparing arr[${j}]=${arr[j]} with arr[${minIdx}]=${arr[minIdx]}`,
        { comparisons, swaps }
      );

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;

      yield createFrame(
        arr,
        [i, minIdx],
        [],
        [i, minIdx],
        `Swapped arr[${i}] with arr[${minIdx}]`,
        { comparisons, swaps }
      );
    }

    const sortedIndices = Array.from({ length: i + 1 }, (_, k) => k);
    yield createFrame(
      arr,
      sortedIndices,
      [],
      [],
      `Pass ${i + 1} complete. Minimum element at position ${i}`,
      { comparisons, swaps }
    );
  }

  yield createFrame(
    arr,
    Array.from({ length: arr.length }, (_, i) => i),
    [],
    [],
    'Sorting complete!',
    { comparisons, swaps }
  );

  return {
    steps: [],
    stats: { totalComparisons: comparisons, totalSwaps: swaps, executionTime: 0 },
    completed: true,
  };
}
