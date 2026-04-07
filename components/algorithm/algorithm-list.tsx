'use client';

import { AlgorithmCategory } from '@/lib/types';
import { algorithms } from '@/lib/algorithms/algorithms-metadata';
import AlgorithmCard from './algorithm-card';

interface AlgorithmListProps {
  category: AlgorithmCategory | null;
  onSelectAlgorithm: (id: string) => void;
  onSelectCategory: (category: AlgorithmCategory | null) => void;
}

export default function AlgorithmList({
  category,
  onSelectAlgorithm,
  onSelectCategory,
}: AlgorithmListProps) {
  const filteredAlgorithms = category
    ? algorithms.filter((algo) => algo.category === category)
    : algorithms;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Algorithm Visualizer</h1>
        <p className="text-muted-foreground mt-2">
          Interactive platform to understand and visualize data structures and algorithms
        </p>
      </div>

      {category && (
        <button
          onClick={() => onSelectCategory(null)}
          className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          ← Clear Filter
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlgorithms.map((algo) => (
          <AlgorithmCard
            key={algo.id}
            algorithm={algo}
            onSelect={() => onSelectAlgorithm(algo.id)}
          />
        ))}
      </div>
    </div>
  );
}
