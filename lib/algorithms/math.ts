import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

function createFrame(
  value: number,
  message?: string,
  step?: number,
  stats?: { comparisons: number }
): VisualizationFrame {
  return {
    array: [value],
    message,
    stats: stats ? { comparisons: stats.comparisons, swaps: 0 } : undefined,
  };
}

export function* fibonacci(
  n: number
): Generator<VisualizationFrame, AlgorithmResult> {
  let comparisons = 0;

  if (n <= 0) {
    yield createFrame(0, 'Fibonacci(0) = 0', 0, { comparisons });
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

  if (n === 1) {
    yield createFrame(1, 'Fibonacci(1) = 1', 0, { comparisons });
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

  const memo: number[] = [0, 1];
  yield createFrame(0, 'Base case: Fibonacci(0) = 0', 0, { comparisons });
  yield createFrame(1, 'Base case: Fibonacci(1) = 1', 1, { comparisons });

  for (let i = 2; i <= n; i++) {
    comparisons++;
    memo[i] = memo[i - 1] + memo[i - 2];

    yield createFrame(
      memo[i],
      `Fibonacci(${i}) = Fibonacci(${i - 1}) + Fibonacci(${i - 2}) = ${memo[i - 1]} + ${memo[i - 2]} = ${memo[i]}`,
      i,
      { comparisons }
    );
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

export function* gcd(a: number, b: number): Generator<VisualizationFrame, AlgorithmResult> {
  let comparisons = 0;

  yield createFrame(
    a,
    `Computing GCD(${a}, ${b}) using Euclidean algorithm`,
    0,
    { comparisons }
  );

  let step = 0;

  while (b !== 0) {
    comparisons++;
    const remainder = a % b;

    yield createFrame(
      a,
      `${a} = ${b} × ${Math.floor(a / b)} + ${remainder}`,
      step,
      { comparisons }
    );

    a = b;
    b = remainder;
    step++;
  }

  yield createFrame(a, `GCD = ${a}`, step, { comparisons });

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

export function* factorial(n: number): Generator<VisualizationFrame, AlgorithmResult> {
  let comparisons = 0;

  yield createFrame(n, `Computing factorial of ${n}`, 0, { comparisons });

  if (n <= 1) {
    yield createFrame(1, `${n}! = 1`, 0, { comparisons });
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

  let result = 1;

  for (let i = 2; i <= n; i++) {
    comparisons++;
    result *= i;

    yield createFrame(
      result,
      `${i}! = ${result} (${result} = ${result / i} × ${i})`,
      i - 1,
      { comparisons }
    );
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
