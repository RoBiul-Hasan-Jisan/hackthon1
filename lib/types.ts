// Algorithm categories and types for DSA visualization

export type AlgorithmCategory = 
  | 'sorting' 
  | 'searching' 
  | 'graphs' 
  | 'trees' 
  | 'dynamic-programming' 
  | 'recursion' 
  | 'strings' 
  | 'math';

export interface AlgorithmMetadata {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  complexity: {
    time: string;
    space: string;
    best?: string;
    average?: string;
    worst?: string;
  };
  pseudoCode: string;
  explanation: string;
  realWorldApplications: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface VisualizationState {
  // Current state of visualization
  step: number;
  isRunning: boolean;
  isPaused: boolean;
  speed: number; // 0.5x to 2x
  currentArray?: number[];
  highlightedIndices: number[];
  comparisonIndices?: number[];
  swappedIndices?: number[];
  history: VisualizationFrame[];
  message?: string;
}

export interface VisualizationFrame {
  array?: number[];
  highlighted?: number[];
  comparisons?: number[];
  swaps?: number[];
  message?: string;
  stats?: {
    comparisons: number;
    swaps: number;
  };
}

export interface GraphNode {
  id: string | number;
  label?: string;
  x?: number;
  y?: number;
  visited?: boolean;
  distance?: number;
  parent?: string | number;
}

export interface GraphEdge {
  from: string | number;
  to: string | number;
  weight?: number;
  highlighted?: boolean;
  visited?: boolean;
}

export interface TreeNode {
  id: string | number;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  visited?: boolean;
  x?: number;
  y?: number;
  parent?: TreeNode;
}

export interface DPTableCell {
  value: number;
  highlighted?: boolean;
  path?: boolean;
}

export interface AlgorithmResult {
  steps: VisualizationFrame[];
  stats: {
    totalComparisons: number;
    totalSwaps: number;
    executionTime: number;
  };
  completed: boolean;
}

export type AlgorithmGenerator = (
  input: number[] | string | any
) => Generator<VisualizationFrame, AlgorithmResult, unknown>;
