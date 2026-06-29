# Akrivis UAT Web App v1.5.0 + Firebase Firestore

เว็บแอปแบบ Static สำหรับฟอร์ม UAT ของระบบ Akrivis Version 1.5.0 บน Staging Server หัวข้อการรับเข้าหลายลูกค้าและหลายสินค้า พร้อมรองรับการบันทึกข้อมูลลง Firebase Cloud Firestore

## ฟังก์ชันหลัก

- แยกฟอร์ม UAT เป็น 3 ส่วน: ตาชั่งใหญ่, ตาชั่งเล็ก / ชั่งซื้อ, และ Admin
- กรอกผลทดสอบ ผ่าน / ไม่ผ่าน / ผ่านโดยมีข้อสังเกต
- บันทึกข้อมูลอัตโนมัติในเครื่องผู้ใช้งานด้วย Local Storage
- บันทึกข้อมูลขึ้น Firebase Cloud Firestore
- โหลดข้อมูลกลับจาก Firebase ด้วย Record ID
- ดูรายการ UAT ล่าสุดจาก Firebase ได้ 20 รายการ
- Export / Import ข้อมูลเป็น JSON
- พิมพ์เอกสารหรือ Save เป็น PDF ได้จาก Browser
- ใช้งานได้บน GitHub Pages โดยไม่ต้องมี Backend

## โครงสร้างไฟล์

```text
.
├── index.html
├── style.css
├── app.js
├── firebase-config.js
├── firebase-config.example.js
├── firebase.json
├── firestore.rules
├── .firebaserc.example
├── .nojekyll
├── README.md
└── .github/workflows/deploy-pages.yml
```

## วิธีตั้งค่า Firebase Firestore

### 1) สร้าง Firebase Project

1. เข้า Firebase Console
2. สร้าง Project ใหม่ หรือเลือก Project เดิม
3. ไปที่ Build > Firestore Database
4. Create database
5. เลือกโหมดเริ่มต้นสำหรับทดสอบ หรือ Production แล้วนำ Rules ด้านล่างไปใส่

### 2) เพิ่ม Web App และนำ Config มาใส่

ไปที่ Project settings > General > Your apps > Add app > Web แล้ว Copy ค่า `firebaseConfig` มาใส่ในไฟล์ `firebase-config.js`

ตัวอย่างไฟล์ `firebase-config.js`

```js
window.AKRIVIS_FIREBASE_CONFIG = {
  apiKey: "xxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxxxxxx",
};

window.AKRIVIS_FIREBASE_COLLECTION = "akrivis_uat_records";
```

### 3) ตั้งค่า Firestore Rules สำหรับ UAT/Staging

ไฟล์นี้เตรียมไว้แล้วที่ `firestore.rules`

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /akrivis_uat_records/{recordId} {
      allow read, write: if true;
    }
  }
}
```

> คำเตือน: Rules นี้เปิดอ่าน/เขียนสำหรับการทดสอบเท่านั้น ไม่ควรใช้กับข้อมูลลับหรือ Production จริง หากต้องการใช้งานจริงควรเพิ่ม Firebase Authentication และจำกัดสิทธิ์เฉพาะผู้ใช้ที่ได้รับอนุญาต

## วิธีใช้งาน Web App

1. เปิดหน้าเว็บ
2. กด `เริ่ม Record ใหม่` เพื่อสร้าง Record ID ใหม่ หรือกรอก Record ID เดิมที่ต้องการโหลด
3. กรอกข้อมูล UAT ในแต่ละแท็บ
4. กด `บันทึกในเครื่อง` เพื่อเก็บข้อมูลใน Browser
5. กด `บันทึก Firebase` เพื่อส่งข้อมูลขึ้น Cloud Firestore
6. กด `โหลด Firebase` เพื่อดึงข้อมูลจาก Record ID
7. กด `ดูรายการล่าสุด` เพื่อดู UAT 20 รายการล่าสุดที่บันทึกไว้

## วิธี Deploy ขึ้น GitHub Pages

1. สร้าง Repository ใหม่ใน GitHub เช่น `akrivis-uat-webapp`
2. Upload ไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น Repository
3. ไปที่ Settings > Pages
4. เลือก Build and deployment เป็น GitHub Actions
5. Push หรือแก้ไขไฟล์ใน branch `main`
6. รอ Workflow ทำงานเสร็จ แล้วเปิด URL ของ GitHub Pages

## วิธี Deploy Firestore Rules ด้วย Firebase CLI ทางเลือก

ติดตั้ง Firebase CLI แล้ว login:

```bash
npm install -g firebase-tools
firebase login
```

แก้ไฟล์ `.firebaserc.example` เป็น `.firebaserc` และเปลี่ยน `YOUR_PROJECT_ID` เป็น Project ID จริง จากนั้นรัน:

```bash
firebase deploy --only firestore:rules
```

## หมายเหตุสำคัญ

- หากยังไม่ใส่ Firebase config ระบบจะทำงานแบบ Local Storage เหมือนเดิม
- การบันทึก Firebase ใช้ Collection ชื่อ `akrivis_uat_records`
- ข้อมูลแต่ละชุดใช้ `Record ID` เป็นเลขอ้างอิง
- ข้อมูลที่ Export เป็น JSON ยังสามารถ Import กลับมาใช้งานได้เหมือนเดิม
