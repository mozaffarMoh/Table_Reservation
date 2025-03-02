self.addEventListener('push', (event) => {
  console.log('event : ', event.data);
  const message = event.data ? event.data.text() : 'Default push message!';
  console.log('message : ', message);

  self.registration.showNotification('Test Notification', {
    body: message,
    icon: '/icon.png',
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});  
