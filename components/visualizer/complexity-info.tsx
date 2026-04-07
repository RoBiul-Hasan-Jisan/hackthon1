'use client';

import { AlgorithmMetadata } from '@/lib/types';

interface ComplexityInfoProps {
  algorithm: AlgorithmMetadata;
}

export default function ComplexityInfo({ algorithm }: ComplexityInfoProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      <h3 className="font-semibold">Complexity Analysis</h3>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Time Complexity</p>
          <p className="font-mono text-sm font-bold text-primary">
            {algorithm.complexity.time}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Space Complexity</p>
          <p className="font-mono text-sm font-bold text-accent">
            {algorithm.complexity.space}
          </p>
        </div>

        {algorithm.complexity.best && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Best Case</p>
            <p className="font-mono text-xs text-muted-foreground">
              {algorithm.complexity.best}
            </p>
          </div>
        )}

        {algorithm.complexity.average && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Average Case</p>
            <p className="font-mono text-xs text-muted-foreground">
              {algorithm.complexity.average}
            </p>
          </div>
        )}

        {algorithm.complexity.worst && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Worst Case</p>
            <p className="font-mono text-xs text-muted-foreground">
              {algorithm.complexity.worst}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-2">Tags</p>
        <div className="flex flex-wrap gap-2">
          {algorithm.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-2">Real-World Applications</p>
        <ul className="text-xs space-y-1">
          {algorithm.realWorldApplications.map((app) => (
            <li key={app} className="text-foreground">
              • {app}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
