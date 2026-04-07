'use client';

import { AlgorithmMetadata } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface AlgorithmCardProps {
  algorithm: AlgorithmMetadata;
  onSelect: () => void;
}

const difficultyColors = {
  easy: 'bg-green-500/20 text-green-300 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function AlgorithmCard({
  algorithm,
  onSelect,
}: AlgorithmCardProps) {
  return (
    <button
      onClick={onSelect}
      className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 text-left hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="flex flex-col gap-3 h-full">
        <div>
          <h3 className="font-bold text-lg">{algorithm.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{algorithm.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded border ${
              difficultyColors[algorithm.difficulty]
            }`}
          >
            {algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
            {algorithm.category}
          </span>
        </div>

        <div className="flex gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
          <div>
            <span className="block font-semibold text-foreground">{algorithm.complexity.time}</span>
            <span>Time</span>
          </div>
          <div>
            <span className="block font-semibold text-foreground">{algorithm.complexity.space}</span>
            <span>Space</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-primary mt-3 text-sm font-semibold group-hover:translate-x-1 transition-transform">
          Visualize <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}
