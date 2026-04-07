'use client';

import { useState } from 'react';
import { algorithms } from '@/lib/algorithms/algorithms-metadata';
import { AlgorithmMetadata } from '@/lib/types';

interface ComparisonData {
  id: string;
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: string;
  stable: boolean;
}

export default function AlgorithmComparison() {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('sorting');

  const categories = Array.from(
    new Set(algorithms.map(a => a.category))
  ).sort();

  const categoryAlgorithms = algorithms.filter(
    a => a.category === category
  );

  const toggleAlgorithm = (id: string) => {
    setSelectedAlgorithms(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const comparisonData: ComparisonData[] = selectedAlgorithms
    .map(id => {
      const algo = algorithms.find(a => a.id === id);
      if (!algo) return null;
      return {
        id: algo.id,
        name: algo.name,
        timeComplexity: algo.complexity.time,
        spaceComplexity: algo.complexity.space,
        difficulty: algo.difficulty,
        stable: algo.tags?.includes('stable') ?? false,
      };
    })
    .filter((a): a is ComparisonData => a !== null);

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Algorithm Comparison Tool</h3>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="text-sm font-medium block mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setSelectedAlgorithms([]);
                }}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  category === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium block mb-3">
            Select Algorithms to Compare (max 3)
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categoryAlgorithms.map(algo => (
              <label
                key={algo.id}
                className="flex items-center gap-3 p-2 rounded hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.includes(algo.id)}
                  onChange={() => toggleAlgorithm(algo.id)}
                  disabled={
                    selectedAlgorithms.length >= 3 &&
                    !selectedAlgorithms.includes(algo.id)
                  }
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium">{algo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {algo.complexity.time} time complexity
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {comparisonData.length > 0 && (
        <div className="border-t border-border pt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-2 py-2 font-semibold">Algorithm</th>
                <th className="text-left px-2 py-2 font-semibold">Time</th>
                <th className="text-left px-2 py-2 font-semibold">Space</th>
                <th className="text-left px-2 py-2 font-semibold">Difficulty</th>
                <th className="text-left px-2 py-2 font-semibold">Stable</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((algo, idx) => (
                <tr
                  key={algo.id}
                  className={`border-b border-border ${
                    idx % 2 === 0 ? 'bg-secondary/30' : ''
                  }`}
                >
                  <td className="px-2 py-3 font-medium text-foreground">
                    {algo.name}
                  </td>
                  <td className="px-2 py-3 font-mono text-primary">
                    {algo.timeComplexity}
                  </td>
                  <td className="px-2 py-3 font-mono text-accent">
                    {algo.spaceComplexity}
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        algo.difficulty === 'easy'
                          ? 'bg-green-500/20 text-green-300'
                          : algo.difficulty === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {algo.difficulty}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span className="text-sm">
                      {algo.stable ? '✓' : '✗'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Insights */}
          <div className="mt-6 space-y-3 border-t border-border pt-4">
            <h4 className="font-semibold text-sm">Comparison Insights</h4>
            <div className="grid gap-3">
              {/* Best Time Complexity */}
              {comparisonData.length > 1 && (
                <div className="bg-secondary/50 rounded p-3 text-xs">
                  <p className="text-muted-foreground font-semibold mb-1">
                    Best Time Complexity
                  </p>
                  <p className="text-foreground">
                    {
                      comparisonData.reduce((best, current) => {
                        const bestVal = parseComplexity(best.timeComplexity);
                        const currentVal = parseComplexity(current.timeComplexity);
                        return currentVal < bestVal ? current : best;
                      }).name
                    }
                  </p>
                </div>
              )}

              {/* Space Efficiency */}
              {comparisonData.length > 1 && (
                <div className="bg-secondary/50 rounded p-3 text-xs">
                  <p className="text-muted-foreground font-semibold mb-1">
                    Most Space Efficient
                  </p>
                  <p className="text-foreground">
                    {
                      comparisonData.reduce((best, current) => {
                        const bestVal = parseComplexity(best.spaceComplexity);
                        const currentVal = parseComplexity(current.spaceComplexity);
                        return currentVal < bestVal ? current : best;
                      }).name
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {comparisonData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Select up to 3 algorithms to compare their characteristics</p>
        </div>
      )}
    </div>
  );
}

// Helper function to parse complexity notation
function parseComplexity(notation: string): number {
  if (notation === 'O(1)') return 1;
  if (notation === 'O(log n)') return 2;
  if (notation === 'O(n)') return 3;
  if (notation === 'O(n log n)') return 4;
  if (notation === 'O(n²)') return 5;
  if (notation === 'O(n³)') return 6;
  if (notation === 'O(2ⁿ)') return 7;
  return 8;
}
