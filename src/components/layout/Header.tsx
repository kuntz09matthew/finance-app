import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => (
  <header
    className="w-full flex items-center justify-between px-6 py-4 border-b"
    style={{
      background: 'var(--header-background)',
      borderColor: 'var(--header-border)',
    }}
  >
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:ring-2 focus:ring-blue-400"
      tabIndex={0}
    >
      Skip to main content
    </a>
    <div className="font-bold text-xl">Finance Assistant</div>
    <nav className="flex items-center" role="navigation" aria-label="Main navigation">
      <a
        href="/dashboard"
        className="mx-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
        tabIndex={0}
      >
        Dashboard
      </a>
      <a
        href="/about"
        className="mx-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
        tabIndex={0}
      >
        About
      </a>
      <ThemeSwitcher />
    </nav>
  </header>
);

export default Header;
