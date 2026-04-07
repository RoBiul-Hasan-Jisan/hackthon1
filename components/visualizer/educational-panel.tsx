'use client';

import { AlgorithmMetadata } from '@/lib/types';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EducationalPanelProps {
  algorithm: AlgorithmMetadata;
}

type TabType = 'overview' | 'complexity' | 'examples' | 'tips';

export default function EducationalPanel({ algorithm }: EducationalPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['overview'])
  );

  const toggleSection = (section: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(section)) {
      newSet.delete(section);
    } else {
      newSet.add(section);
    }
    setExpandedSections(newSet);
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'complexity', label: 'Complexity' },
    { id: 'examples', label: 'Examples' },
    { id: 'tips', label: 'Tips' },
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <button
                onClick={() => toggleSection('description')}
                className="w-full flex items-center justify-between text-left font-semibold hover:text-primary transition-colors"
              >
                <span>Description</span>
                {expandedSections.has('description') ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has('description') && (
                <p className="text-sm text-muted-foreground mt-2">
                  {algorithm.description}
                </p>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <button
                onClick={() => toggleSection('explanation')}
                className="w-full flex items-center justify-between text-left font-semibold hover:text-primary transition-colors"
              >
                <span>How It Works</span>
                {expandedSections.has('explanation') ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has('explanation') && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {algorithm.explanation}
                </p>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <button
                onClick={() => toggleSection('applications')}
                className="w-full flex items-center justify-between text-left font-semibold hover:text-primary transition-colors"
              >
                <span>Real-World Applications</span>
                {expandedSections.has('applications') ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has('applications') && (
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  {algorithm.realWorldApplications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">▸</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {activeTab === 'complexity' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Time Complexity</h4>
              <div className="bg-secondary rounded p-3">
                <p className="font-mono font-bold text-primary">
                  {algorithm.complexity.time}
                </p>
                {algorithm.complexity.average && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Average: {algorithm.complexity.average}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Space Complexity</h4>
              <div className="bg-secondary rounded p-3">
                <p className="font-mono font-bold text-accent">
                  {algorithm.complexity.space}
                </p>
              </div>
            </div>

            {(algorithm.complexity.best || algorithm.complexity.worst) && (
              <div className="space-y-2 border-t border-border pt-4">
                <h4 className="font-semibold text-sm">Detailed Analysis</h4>
                <div className="space-y-2 text-sm">
                  {algorithm.complexity.best && (
                    <div>
                      <p className="text-muted-foreground">Best Case</p>
                      <p className="font-mono font-bold">
                        {algorithm.complexity.best}
                      </p>
                    </div>
                  )}
                  {algorithm.complexity.worst && (
                    <div>
                      <p className="text-muted-foreground">Worst Case</p>
                      <p className="font-mono font-bold">
                        {algorithm.complexity.worst}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Usage Examples</h4>
              <div className="bg-secondary rounded p-3 text-xs text-muted-foreground">
                <p className="mb-2">
                  This algorithm is commonly used in scenarios where you need to
                  {algorithm.category === 'sorting'
                    ? ' arrange data in a specific order'
                    : algorithm.category === 'searching'
                    ? ' locate specific elements efficiently'
                    : algorithm.category === 'graphs'
                    ? ' traverse or analyze graph structures'
                    : algorithm.category === 'trees'
                    ? ' traverse tree structures'
                    : algorithm.category === 'dynamic-programming'
                    ? ' solve optimization problems'
                    : ' understand recursive patterns'}
                  .
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Try Modifying</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-primary">▸</span>
                  <span>
                    Change the array size in the controls to see how complexity
                    affects execution
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">▸</span>
                  <span>
                    Adjust the speed slider to slow down and study each step
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">▸</span>
                  <span>
                    Use step controls to examine specific parts of the algorithm
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Learning Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    Focus on understanding the core logic before worrying about
                    implementation details
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    Trace through the algorithm manually with small examples to
                    build intuition
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    Compare this algorithm with others in the same category to
                    understand trade-offs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>
                    Practice implementing it from scratch to solidify your
                    understanding
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-sm mb-2">Common Mistakes</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">⚠</span>
                  <span>
                    Forgetting to handle edge cases (empty arrays, single
                    elements)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">⚠</span>
                  <span>Off-by-one errors in loop boundaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">⚠</span>
                  <span>Not considering time and space complexity trade-offs</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
