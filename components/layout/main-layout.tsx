'use client';

import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Sidebar from './sidebar';
import Header from './header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleDarkMode={toggleDarkMode}
          isDark={isDark}
        />
        <div className="flex h-[calc(100vh-64px)]">
          {sidebarOpen && <Sidebar />}
          <main className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
