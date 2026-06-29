// Firebase config for Akrivis UAT Web App
// วิธีตั้งค่า:
// 1) Firebase Console > Project settings > General > Your apps > Web app
// 2) Copy ค่า firebaseConfig มาใส่แทน YOUR_...
// 3) เปิดใช้ Firestore Database ใน Firebase Console

window.AKRIVIS_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ชื่อ Collection ใน Cloud Firestore
window.AKRIVIS_FIREBASE_COLLECTION = "akrivis_uat_records";
