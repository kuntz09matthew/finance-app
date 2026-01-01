import { useEffect } from 'react';

export default function usePushNotifications() {
  useEffect(() => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
}
