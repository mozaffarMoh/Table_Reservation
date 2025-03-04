self.addEventListener('push', (event) => {
  let notificationData = { title: "New Notification", body: "You have a new message!" };

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (error) {
      console.error("Error parsing push message:", error);
    }
  }

  self.registration.showNotification(notificationData.title, {
    body: notificationData.body,
    icon: '/favicon.svg',
  });
});
