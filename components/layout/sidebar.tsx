'use client';

import { BarChart3, Search, GitBranch, Trees, Grid3x3, Radio, Type, Calculator } from 'lucide-react';
import { AlgorithmCategory } from '@/lib/types';
import Link from 'next/link';

const categories: { id: AlgorithmCategory; name: string; icon: React.ReactNode }[] = [
  { id: 'sorting', name: 'Sorting', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'searching', name: 'Searching', icon: <Search className="w-5 h-5" /> },
  { id: 'graphs', name: 'Graphs', icon: <GitBranch className="w-5 h-5" /> },
  { id: 'trees', name: 'Trees', icon: <Trees className="w-5 h-5" /> },
  { id: 'dynamic-programming', name: 'Dynamic Programming', icon: <Grid3x3 className="w-5 h-5" /> },
  { id: 'recursion', name: 'Recursion', icon: <Radio className="w-5 h-5" /> },
  { id: 'strings', name: 'Strings', icon: <Type className="w-5 h-5" /> },
  { id: 'math', name: 'Math', icon: <Calculator className="w-5 h-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-sidebar h-full overflow-y-auto">
      <nav className="p-4 space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground px-2 py-2">CATEGORIES</h2>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?category=${category.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground hover:text-primary"
          >
            {category.icon}
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}

        <div className="border-t border-sidebar-border my-4" />

        <h2 className="text-sm font-semibold text-muted-foreground px-2 py-2">RESOURCES</h2>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sm text-sidebar-foreground"
        >
          Documentation
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sm text-sidebar-foreground"
        >
          Github
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sm text-sidebar-foreground"
        >
          About
        </a>
      </nav>
    </aside>
  );
}
