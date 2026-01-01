'use client';
import React from 'react';
import usePushNotifications from '@/hooks/usePushNotifications';
import useServiceWorker from '@/hooks/useServiceWorker';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  usePushNotifications();
  useServiceWorker();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main id="main-content" className="flex-1 p-6 md:p-10 bg-background ml-0 md:ml-64">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppShell;
