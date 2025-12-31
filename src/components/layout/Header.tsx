import React from 'react';

const Header: React.FC = () => (
  <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-background text-foreground">
    <div className="font-bold text-xl">Finance Assistant</div>
    <nav>
      <a href="/dashboard" className="mx-2 hover:underline">
        Dashboard
      </a>
      <a href="/about" className="mx-2 hover:underline">
        About
      </a>
    </nav>
  </header>
);

export default Header;
