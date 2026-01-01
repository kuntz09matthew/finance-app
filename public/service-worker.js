// public/service-worker.js

self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    // Fallback for plain text push messages (DevTools)
    const text = event.data ? event.data.text() : '';
    data = { title: text, body: text };
  }
  // Always show a notification, even if data is empty
  const title = data.title || 'Finance Assistant Alert';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: data.url || '/',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
