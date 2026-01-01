'use client';
import React, { useEffect, useState } from 'react';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    if (window.localStorage && localStorage.theme) return localStorage.theme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark';
  }
  return 'light';
};

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Use a lazy initial state to ensure this only runs on the client
  const [mounted] = useState(() => typeof window !== 'undefined');

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    if (typeof window !== 'undefined') {
      localStorage.theme = theme;
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="ml-4 px-3 py-1 rounded border bg-background text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeSwitcher;
