'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import AlgorithmList from '@/components/algorithm/algorithm-list';
import AlgorithmVisualizer from '@/components/visualizer/algorithm-visualizer';
import { AlgorithmCategory } from '@/lib/types';

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory | null>(null);

  return (
    <MainLayout>
      <div className="flex flex-col h-full gap-4">
        {!selectedAlgorithm ? (
          <AlgorithmList
            category={selectedCategory}
            onSelectAlgorithm={setSelectedAlgorithm}
            onSelectCategory={setSelectedCategory}
          />
        ) : (
          <div className="flex flex-col h-full">
            <button
              onClick={() => setSelectedAlgorithm(null)}
              className="mb-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              ← Back to Algorithms
            </button>
            <AlgorithmVisualizer algorithmId={selectedAlgorithm} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
