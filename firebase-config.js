// Firebase config for Akrivis UAT Web App
// วิธีตั้งค่า:
// 1) Firebase Console > Project settings > General > Your apps > Web app
// 2) Copy ค่า firebaseConfig มาใส่แทน YOUR_...
// 3) เปิดใช้ Firestore Database ใน Firebase Console

window.AKRIVIS_FIREBASE_CONFIG = {
  apiKey: "[GCP_API_KEY]",
  authDomain: "akrivis-uat-webapp.firebaseapp.com",
  projectId: "akrivis-uat-webapp",
  storageBucket: "akrivis-uat-webapp.firebasestorage.app",
  messagingSenderId: "494554499178",
  appId: "1:494554499178:web:4668878b3939f8d735a855",
  measurementId: "G-19125G426K"
};

// ชื่อ Collection ใน Cloud Firestore
window.AKRIVIS_FIREBASE_COLLECTION = "akrivis_uat_records";
