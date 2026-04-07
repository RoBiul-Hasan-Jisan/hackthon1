import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

function createFrame(
  array: number[],
  message?: string,
  stats?: { comparisons: number }
): VisualizationFrame {
  return {
    array,
    message,
    stats: stats ? { comparisons: stats.comparisons, swaps: 0 } : undefined,
  };
}

export function* longestCommonSubsequence(
  str1: string,
  str2: string
): Generator<VisualizationFrame, AlgorithmResult> {
  const m = str1.length;
  const n = str2.length;
  let comparisons = 0;

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  yield createFrame(
    [],
    `Computing LCS of "${str1}" and "${str2}"`,
    { comparisons }
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      comparisons++;

      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;

        yield createFrame(
          [dp[i][j]],
          `Match found: "${str1[i - 1]}" at position (${i}, ${j})`,
          { comparisons }
        );
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcsLength = dp[m][n];

  yield createFrame(
    [lcsLength],
    `LCS length: ${lcsLength}`,
    { comparisons }
  );

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

export function* editDistance(
  str1: string,
  str2: string
): Generator<VisualizationFrame, AlgorithmResult> {
  const m = str1.length;
  const n = str2.length;
  let comparisons = 0;

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  yield createFrame(
    [],
    `Computing Edit Distance between "${str1}" and "${str2}"`,
    { comparisons }
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      comparisons++;

      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];

        yield createFrame(
          [dp[i][j]],
          `Characters match: "${str1[i - 1]}" at (${i}, ${j})`,
          { comparisons }
        );
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // deletion
            dp[i][j - 1], // insertion
            dp[i - 1][j - 1] // substitution
          );

        yield createFrame(
          [dp[i][j]],
          `Mismatch at (${i}, ${j}): "${str1[i - 1]}" vs "${str2[j - 1]}", cost: ${dp[i][j]}`,
          { comparisons }
        );
      }
    }
  }

  const distance = dp[m][n];

  yield createFrame(
    [distance],
    `Edit Distance: ${distance}`,
    { comparisons }
  );

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

export function* coinChange(
  coins: number[],
  amount: number
): Generator<VisualizationFrame, AlgorithmResult> {
  let comparisons = 0;

  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  yield createFrame(
    [...dp],
    `Computing minimum coins for amount ${amount} using coins [${coins.join(', ')}]`,
    { comparisons }
  );

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      comparisons++;

      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);

        if (dp[i] !== Infinity) {
          yield createFrame(
            [...dp],
            `dp[${i}] = ${dp[i]} (using coin ${coin})`,
            { comparisons }
          );
        }
      }
    }
  }

  const minCoins = dp[amount];

  yield createFrame(
    [...dp],
    `Minimum coins needed: ${minCoins === Infinity ? 'Impossible' : minCoins}`,
    { comparisons }
  );

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

export function* climbingStairs(n: number): Generator<VisualizationFrame, AlgorithmResult> {
  let comparisons = 0;

  if (n <= 0) {
    yield createFrame([], `Cannot climb ${n} stairs`, { comparisons });
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

  const dp: number[] = [1, 1];

  yield createFrame(
    [1, 1],
    `Computing ways to climb ${n} stairs`,
    { comparisons }
  );

  for (let i = 2; i <= n; i++) {
    comparisons++;
    dp[i] = dp[i - 1] + dp[i - 2];

    yield createFrame(
      [...dp.slice(0, i + 1)],
      `Ways to reach step ${i}: ${dp[i]} (sum of ${dp[i - 1]} + ${dp[i - 2]})`,
      { comparisons }
    );
  }

  yield createFrame(
    [...dp],
    `Total ways to climb ${n} stairs: ${dp[n]}`,
    { comparisons }
  );

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
