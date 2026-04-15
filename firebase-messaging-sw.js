importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// ใส่ Config ของคุณลงใน Service Worker ด้วย
firebase.initializeApp({
    apiKey: "AIzaSyAgTWrI1G1t3GYVz4-SPM7btrsixSe0el8",
    authDomain: "time-tracker-46283.firebaseapp.com",
    projectId: "time-tracker-46283",
    storageBucket: "time-tracker-46283.firebasestorage.app",
    messagingSenderId: "882533547295",
    appId: "1:882533547295:web:4b78bfc84322c58a50042a",
    measurementId: "G-5DPBNCSWFW"
});

const messaging = firebase.messaging();

// รับข้อความจาก Firebase ตอนที่แอปถูกพับเก็บอยู่
messaging.onBackgroundMessage(function(payload) {
    console.log('ได้รับข้อความจาก Firebase: ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://via.placeholder.com/192',
        // ถ้าเราส่ง Link มาด้วยจากหลังบ้าน ให้รับค่ามาเปิด
        data: { url: payload.data ? payload.data.url : './page2.html' } 
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// พอกดแจ้งเตือนให้เปิดหน้าเว็บ
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = event.notification.data.url || '/';
    event.waitUntil( clients.openWindow(targetUrl) );
});