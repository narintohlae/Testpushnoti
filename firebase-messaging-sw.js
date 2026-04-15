importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Config ของคุณ
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

// รับข้อความตอนพับแอป (Background)
messaging.onBackgroundMessage(function(payload) {
    console.log('ได้รับข้อความจาก Firebase: ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://via.placeholder.com/192',
        // ถ้า Firebase ส่ง URL มาให้เปิดหน้านั้น ถ้าไม่มีให้ไปหน้า page2.html
        data: { url: payload.data && payload.data.url ? payload.data.url : './page2.html' } 
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// พอกดแจ้งเตือนให้เปิดหน้าแอป
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = event.notification.data.url || '/';
    event.waitUntil( clients.openWindow(targetUrl) );
});