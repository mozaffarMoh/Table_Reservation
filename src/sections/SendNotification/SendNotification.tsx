"use client";
import { useEffect } from "react";

const VAPID_PUBLIC_KEY = "YOUR_PUBLIC_VAPID_KEY"; // Replace with your actual VAPID Public Key

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const PushNotification = () => {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push notifications are not supported in this browser.");
      return;
    }

    navigator.serviceWorker.register("/sw.js").then(async (registration) => {
      console.log("Service Worker Registered ✅", registration);

      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Already subscribed:", existingSubscription);
        return;
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      console.log("New Subscription:", newSubscription);

      // Send subscription data to the backend
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: newSubscription }),
      });
    }).catch((error) => console.error("Service Worker Registration Failed ❌", error));
  }, []);

  return <button onClick={() => Notification.requestPermission()}>Enable Notifications</button>;
};

export default PushNotification;
