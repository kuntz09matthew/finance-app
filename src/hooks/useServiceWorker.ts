import { useEffect } from 'react';

export default function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
      });
    }
  }, []);
}
