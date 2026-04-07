'use client';

import { AlgorithmMetadata } from '@/lib/types';
import { Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeExplorerProps {
  algorithm: AlgorithmMetadata;
}

export default function CodeExplorer({ algorithm }: CodeExplorerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(algorithm.pseudoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm">Pseudo Code</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <pre className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
          {algorithm.pseudoCode}
        </pre>
      </div>

      <div className="border-t border-border p-4 space-y-2">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Code'}
        </button>

        <div className="bg-secondary/20 rounded-lg p-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {algorithm.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
