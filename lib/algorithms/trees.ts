import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

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

// Helper to build a sample BST
function buildSampleBST(): TreeNode {
  const root: TreeNode = { value: 50 };
  const insert = (node: TreeNode, value: number) => {
    if (value < node.value) {
      if (node.left) insert(node.left, value);
      else node.left = { value };
    } else {
      if (node.right) insert(node.right, value);
      else node.right = { value };
    }
  };

  [30, 70, 20, 40, 60, 80, 10, 25, 35, 65].forEach(v => insert(root, v));
  return root;
}

export function* inorderTraversal(root?: TreeNode): Generator<VisualizationFrame, AlgorithmResult> {
  const tree = root || buildSampleBST();
  const result: number[] = [];
  let comparisons = 0;

  function* traverse(node?: TreeNode): Generator<VisualizationFrame, void> {
    if (!node) return;

    yield* traverse(node.left);

    comparisons++;
    result.push(node.value);

    yield createFrame(
      [...result],
      `Visited node ${node.value} (Inorder: Left, Root, Right)`,
      { comparisons }
    );

    yield* traverse(node.right);
  }

  yield createFrame([], 'Starting Inorder Traversal', { comparisons });
  yield* traverse(tree);

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

export function* preorderTraversal(root?: TreeNode): Generator<VisualizationFrame, AlgorithmResult> {
  const tree = root || buildSampleBST();
  const result: number[] = [];
  let comparisons = 0;

  function* traverse(node?: TreeNode): Generator<VisualizationFrame, void> {
    if (!node) return;

    comparisons++;
    result.push(node.value);

    yield createFrame(
      [...result],
      `Visited node ${node.value} (Preorder: Root, Left, Right)`,
      { comparisons }
    );

    yield* traverse(node.left);
    yield* traverse(node.right);
  }

  yield createFrame([], 'Starting Preorder Traversal', { comparisons });
  yield* traverse(tree);

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

export function* postorderTraversal(root?: TreeNode): Generator<VisualizationFrame, AlgorithmResult> {
  const tree = root || buildSampleBST();
  const result: number[] = [];
  let comparisons = 0;

  function* traverse(node?: TreeNode): Generator<VisualizationFrame, void> {
    if (!node) return;

    yield* traverse(node.left);
    yield* traverse(node.right);

    comparisons++;
    result.push(node.value);

    yield createFrame(
      [...result],
      `Visited node ${node.value} (Postorder: Left, Right, Root)`,
      { comparisons }
    );
  }

  yield createFrame([], 'Starting Postorder Traversal', { comparisons });
  yield* traverse(tree);

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

export function* levelorderTraversal(root?: TreeNode): Generator<VisualizationFrame, AlgorithmResult> {
  const tree = root || buildSampleBST();
  const result: number[] = [];
  let comparisons = 0;

  const queue: TreeNode[] = [tree];

  while (queue.length > 0) {
    const node = queue.shift()!;
    comparisons++;
    result.push(node.value);

    yield createFrame(
      [...result],
      `Visited node ${node.value}`,
      { comparisons }
    );

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
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
