'use client';

import { useState } from 'react';
import { Shuffle } from 'lucide-react';

interface CustomInputProps {
  algorithmId: string;
  onInputChange: (input: string | number[]) => void;
}

export default function CustomInput({
  algorithmId,
  onInputChange,
}: CustomInputProps) {
  const [input, setInput] = useState('');
  const [isArray, setIsArray] = useState(true);

  const generateRandomArray = () => {
    const size = 20;
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setInput(arr.join(', '));
    onInputChange(arr);
  };

  const generateSortedArray = () => {
    const size = 20;
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    setInput(arr.join(', '));
    onInputChange(arr);
  };

  const generateReverseArray = () => {
    const size = 20;
    const arr = Array.from({ length: size }, (_, i) => size - i);
    setInput(arr.join(', '));
    onInputChange(arr);
  };

  const handleParse = () => {
    if (isArray) {
      try {
        const nums = input.split(',').map(s => parseInt(s.trim()));
        if (nums.some(n => isNaN(n))) {
          alert('Please enter valid numbers separated by commas');
          return;
        }
        onInputChange(nums);
      } catch {
        alert('Error parsing input');
      }
    } else {
      onInputChange(input);
    }
  };

  const isSorting = algorithmId.includes('sort');
  const isSearching = algorithmId.includes('search');
  const isString = algorithmId.includes('edit') || algorithmId.includes('lcs');

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <h3 className="font-semibold">Custom Input</h3>

      {isString && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter String</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., ABCD"
            className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleParse}
            className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Apply String
          </button>
        </div>
      )}

      {(isSorting || isSearching) && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Array Values (comma-separated)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 45, 23, 67, 12, 89"
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              rows={3}
            />
            <button
              onClick={handleParse}
              className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Apply Array
            </button>
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-xs text-muted-foreground font-semibold">Quick Generate</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={generateRandomArray}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm"
              >
                <Shuffle className="w-3 h-3" />
                Random
              </button>
              <button
                onClick={generateSortedArray}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm"
              >
                ↑ Sorted
              </button>
              <button
                onClick={generateReverseArray}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm col-span-2"
              >
                ↓ Reversed
              </button>
            </div>
          </div>
        </>
      )}

      <div className="text-xs text-muted-foreground bg-secondary/50 rounded p-3">
        <p className="font-semibold mb-1">Tip:</p>
        {isSorting && (
          <p>
            Try different input patterns (random, sorted, reversed) to see how the
            algorithm&apos;s performance varies across different cases.
          </p>
        )}
        {isSearching && (
          <p>
            Ensure your array is sorted for binary search. For linear search, order
            doesn&apos;t matter.
          </p>
        )}
        {isString && (
          <p>
            Compare different strings to see how the algorithm finds similarities or
            calculates differences.
          </p>
        )}
      </div>
    </div>
  );
}
