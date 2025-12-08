/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

self.addEventListener("install", () => {
    console.log("Service Worker installing");
});

async function loadConfig() {
    const res = await fetch("/firebase-config.json");
    return res.json();
}

loadConfig().then((config) => {
    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: "/logo.png",
        };

        self.registration.showNotification(
            notificationTitle,
            notificationOptions
        );
    });
});
