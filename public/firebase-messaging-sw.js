/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

self.addEventListener("install", (event) => {
    console.log("Service Worker installing");
    self.skipWaiting(); 
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activated");
    event.waitUntil(clients.claim());
});

self.addEventListener("periodicsync", (event) => {
    if (event.tag === "keep-alive") {
        event.waitUntil(keepAlive());
    }
});

async function keepAlive() {
    console.log("Keep alive ping");
}

async function loadConfig() {
    const res = await fetch("/firebase-config.json");
    return res.json();
}

loadConfig().then((config) => {
    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        const notificationTitle =
            payload.notification?.title ||
            payload.data?.title ||
            "New Notification";
        const notificationBody =
            payload.notification?.body ||
            payload.data?.body ||
            "";
        const notificationOptions = {
            body: notificationBody,
            icon: payload.notification?.icon || payload.data?.avatarUrl || "/logo.png",
            badge: "/logo.png",
            tag: payload.data?.type || "default", 
            data: payload.data, 
            requireInteraction: false, 
        };

        self.registration.showNotification(
            notificationTitle,
            notificationOptions
        );
    });
    self.addEventListener("notificationclick", (event) => {
        console.log("Notification clicked:", event.notification);

        event.notification.close(); //  Đóng notification

        // Mở hoặc focus vào tab
        const urlToOpen = event.notification.data?.path || "/notifications";

        event.waitUntil(
            clients.matchAll({ type: "window", includeUncontrolled: true })
                .then((clientList) => {
                    // Tìm tab đang mở
                    for (let i = 0; i < clientList.length; i++) {
                        const client = clientList[i];
                        if (client.url.includes(urlToOpen) && "focus" in client) {
                            return client.focus();
                        }
                    }
                    // Nếu không có tab nào, mở tab mới
                    if (clients.openWindow) {
                        return clients.openWindow(urlToOpen);
                    }
                })
        );
    });
    
}).catch((error) => {
    console.error("Firebase initialization failed:", error);
});