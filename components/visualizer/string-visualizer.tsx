'use client';

import { useState, useEffect } from 'react';

interface StringVisualizerProps {
  str1?: string;
  str2?: string;
  algorithmId: string;
  dp?: number[][];
  highlightedCells?: [number, number][];
}

export default function StringVisualizer({
  str1 = 'ABCD',
  str2 = 'ACBD',
  algorithmId,
  dp,
  highlightedCells = [],
}: StringVisualizerProps) {
  const [matrix, setMatrix] = useState<number[][]>([]);

  useEffect(() => {
    // Initialize DP table for edit distance or LCS
    if (dp) {
      setMatrix(dp);
    } else {
      // Default: edit distance
      const m = str1.length;
      const n = str2.length;
      const table: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

      // Initialize first row and column
      for (let i = 0; i <= m; i++) table[i][0] = i;
      for (let j = 0; j <= n; j++) table[0][j] = j;

      setMatrix(table);
    }
  }, [dp, str1, str2]);

  const highlightedSet = new Set(
    highlightedCells.map(([i, j]) => `${i},${j}`)
  );

  if (matrix.length === 0) {
    return (
      <div className="bg-secondary rounded-lg border border-border p-6 flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading visualization...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Matrix visualization */}
      <div className="bg-secondary rounded-lg border border-border p-6 overflow-x-auto">
        <div className="inline-block">
          {/* Header row with str2 characters */}
          <div className="flex gap-1 mb-1">
            <div className="w-8 h-8" /> {/* Empty corner cell */}
            {str2.split('').map((char, j) => (
              <div
                key={`header-${j}`}
                className="w-8 h-8 flex items-center justify-center bg-primary/20 rounded border border-primary/30 text-sm font-bold"
              >
                {char}
              </div>
            ))}
          </div>

          {/* Rows with str1 characters and matrix values */}
          {matrix.map((row, i) => (
            <div key={`row-${i}`} className="flex gap-1 mb-1">
              {i > 0 && (
                <div className="w-8 h-8 flex items-center justify-center bg-accent/20 rounded border border-accent/30 text-sm font-bold">
                  {str1[i - 1]}
                </div>
              )}
              {i === 0 && <div className="w-8 h-8" />}

              {row.map((cell, j) => {
                const isHighlighted = highlightedSet.has(`${i},${j}`);
                const cellClass = isHighlighted
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border-border text-foreground';

                return (
                  <div
                    key={`cell-${i}-${j}`}
                    className={`w-8 h-8 flex items-center justify-center rounded border ${cellClass} text-xs font-semibold transition-all`}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-card rounded-lg border border-border p-4 space-y-3">
        <h3 className="font-semibold">String Comparison</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">String 1</p>
            <p className="font-mono font-bold text-primary">{str1}</p>
          </div>
          <div>
            <p className="text-muted-foreground">String 2</p>
            <p className="font-mono font-bold text-accent">{str2}</p>
          </div>
        </div>

        {algorithmId.includes('edit') && (
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-2">Edit Distance Explanation</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              The DP table shows the minimum edit distance (insertions, deletions, substitutions)
              needed to transform String 1 into String 2. The bottom-right cell contains the result.
            </p>
          </div>
        )}

        {algorithmId.includes('lcs') && (
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-2">LCS Explanation</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              The DP table shows the length of the longest common subsequence between
              the two strings. Highlighted cells indicate character matches.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
