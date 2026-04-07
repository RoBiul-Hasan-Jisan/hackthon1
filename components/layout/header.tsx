'use client';

import { Menu, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  isDark: boolean;
}

export default function Header({
  onToggleSidebar,
  onToggleDarkMode,
  isDark,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-secondary rounded-lg transition-colors md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span className="text-balance">Algorithm Visualizer</span>
          </Link>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
}
