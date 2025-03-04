/* Send notificaiton component */
'use client';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const PushNotification = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications are not supported in this browser.');
      return;
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then(async (registration) => {
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          console.log('Already subscribed:', existingSubscription);
          localStorage.setItem(
            'push-subscription',
            JSON.stringify(existingSubscription),
          );
          return;
        }

        const newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        console.log('New Subscription:', newSubscription);
        localStorage.setItem(
          'push-subscription',
          JSON.stringify(newSubscription),
        );

        // Send subscription data to the backend
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscription: newSubscription }),
        });
      })
      .catch((error) =>
        console.error('Service Worker Registration Failed ❌', error),
      );
  }, []);

  const sendPushNotification = async () => {
    setLoading(true);
    try {
      const storedSubscription = localStorage.getItem('push-subscription');

      if (!storedSubscription) {
        alert('No subscription found. Please enable notifications first.');
        setLoading(false);
        return;
      }
      let storedSubscriptionParse = JSON.parse(storedSubscription);

      axios
        .post('/api/subscribe', { subscription: storedSubscriptionParse })
        .then((res) => {
          console.log('Message sent : ', res.data);
        })
        .catch((err) => {
          console.log('Message not sent: ', err);
        });
        
    } catch (error) {
      console.error('Error sending push notification:', error);
      alert('Error sending notification.');
    }
    setLoading(false);
  };

  return (
    <Stack>
      <Button
        onClick={() => Notification.requestPermission()}
        variant="contained"
        color="success"
        sx={{ width: 200 }}
      >
        Enable Permissions
      </Button>
      <Button
        sx={{ width: 200, mt: 3 }}
        onClick={sendPushNotification}
        disabled={loading}
        variant="contained"
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </Button>
    </Stack>
  );
};

export default PushNotification;
