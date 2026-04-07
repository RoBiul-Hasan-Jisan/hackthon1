import { VisualizationFrame, AlgorithmResult } from '@/lib/types';

interface GraphNode {
  id: number;
  visited?: boolean;
  distance?: number;
}

function createFrame(
  graph: GraphNode[],
  edges: [number, number][],
  message?: string,
  stats?: { comparisons: number }
): VisualizationFrame {
  return {
    array: graph.map(n => (n.visited ? 2 : n.distance ?? 1)),
    message,
    stats: stats ? { comparisons: stats.comparisons, swaps: 0 } : undefined,
  };
}

export function* bfs(adjacencyList: number[][], startNode: number = 0): Generator<VisualizationFrame, AlgorithmResult> {
  const visited = new Array(adjacencyList.length).fill(false);
  const queue: number[] = [];
  let comparisons = 0;

  queue.push(startNode);
  visited[startNode] = true;

  yield createFrame(
    adjacencyList.map((_, i) => ({ id: i, visited: visited[i] })),
    [],
    `Starting BFS from node ${startNode}`,
    { comparisons }
  );

  while (queue.length > 0) {
    const node = queue.shift()!;
    comparisons++;

    yield createFrame(
      adjacencyList.map((_, i) => ({ id: i, visited: visited[i] })),
      [],
      `Processing node ${node}`,
      { comparisons }
    );

    for (const neighbor of adjacencyList[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);

        yield createFrame(
          adjacencyList.map((_, i) => ({ id: i, visited: visited[i] })),
          [],
          `Visited node ${neighbor}`,
          { comparisons }
        );
      }
    }
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

export function* dfs(adjacencyList: number[][], startNode: number = 0): Generator<VisualizationFrame, AlgorithmResult> {
  const visited = new Array(adjacencyList.length).fill(false);
  let comparisons = 0;

  function* dfsHelper(node: number): Generator<VisualizationFrame, void> {
    visited[node] = true;
    comparisons++;

    yield createFrame(
      adjacencyList.map((_, i) => ({ id: i, visited: visited[i] })),
      [],
      `Visiting node ${node}`,
      { comparisons }
    );

    for (const neighbor of adjacencyList[node]) {
      if (!visited[neighbor]) {
        yield* dfsHelper(neighbor);
      }
    }
  }

  yield createFrame(
    adjacencyList.map((_, i) => ({ id: i, visited: visited[i] })),
    [],
    `Starting DFS from node ${startNode}`,
    { comparisons }
  );

  yield* dfsHelper(startNode);

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
