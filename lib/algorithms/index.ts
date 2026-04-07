import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
} from './sorting';
import { linearSearch, binarySearch } from './searching';
import { fibonacci, gcd, factorial } from './math';
import { bfs, dfs } from './graphs';
import { inorderTraversal, preorderTraversal, postorderTraversal, levelorderTraversal } from './trees';
import { longestCommonSubsequence, editDistance, coinChange, climbingStairs } from './dynamic-programming';
import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

export type AlgorithmFunction = (
  input: number[] | number | string | [number[], number] | [string, string]
) => Generator<VisualizationFrame, AlgorithmResult>;

const algorithms: Record<string, AlgorithmFunction> = {
  // Sorting
  'bubble-sort': (input) => bubbleSort(input as number[]),
  'quick-sort': (input) => quickSort(input as number[]),
  'merge-sort': (input) => mergeSort(input as number[]),
  'insertion-sort': (input) => insertionSort(input as number[]),
  'selection-sort': (input) => selectionSort(input as number[]),

  // Searching
  'linear-search': (input) => {
    const [arr, target] = input as [number[], number];
    return linearSearch(arr, target);
  },
  'binary-search': (input) => {
    const [arr, target] = input as [number[], number];
    return binarySearch(arr, target);
  },

  // Math
  fibonacci: (input) => fibonacci(input as number),
  gcd: (input) => {
    const [a, b] = input as [number, number];
    return gcd(a, b);
  },
  factorial: (input) => factorial(input as number),

  // Graphs
  bfs: (input) => bfs([[1, 2], [0, 3], [0, 4], [1], [1]]),
  dfs: (input) => dfs([[1, 2], [0, 3], [0, 4], [1], [1]]),

  // Trees
  'tree-traversal-inorder': (input) => inorderTraversal(),
  'tree-traversal-preorder': (input) => preorderTraversal(),
  'tree-traversal-postorder': (input) => postorderTraversal(),
  'tree-traversal-levelorder': (input) => levelorderTraversal(),

  // Dynamic Programming
  'longest-common-subsequence': (input) => {
    const [str1, str2] = input as [string, string];
    return longestCommonSubsequence(str1, str2);
  },
  'edit-distance': (input) => {
    const [str1, str2] = input as [string, string];
    return editDistance(str1, str2);
  },
  'coin-change': (input) => coinChange([1, 2, 5], 5),
  'climbing-stairs': (input) => climbingStairs(5),
};

export function getAlgorithm(id: string): AlgorithmFunction | undefined {
  return algorithms[id];
}

export function getAlgorithmIds(): string[] {
  return Object.keys(algorithms);
}

export { bubbleSort, quickSort, mergeSort, insertionSort, selectionSort };
export { linearSearch, binarySearch };
export { fibonacci, gcd, factorial };
export { bfs, dfs };
export { inorderTraversal, preorderTraversal, postorderTraversal, levelorderTraversal };
export { longestCommonSubsequence, editDistance, coinChange, climbingStairs };
