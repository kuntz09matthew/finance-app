'use client';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header />
    <div className="flex flex-1 w-full">
      <Sidebar />
      <main id="main-content" className="flex-1 p-6 md:p-10 bg-background">
        {children}
      </main>
    </div>
    <Footer />
  </div>
);

export default AppShell;
