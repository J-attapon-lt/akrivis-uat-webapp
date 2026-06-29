# Akrivis UAT Web App v1.5.0

เว็บแอปสำหรับให้พนักงานทำแบบประเมิน UAT ระบบ Akrivis Version 1.5.0 บน Staging Server

## สิ่งที่ปรับในเวอร์ชันนี้

- เพิ่ม Logo บริษัทในส่วนหัวของเว็บ
- แสดงชื่อผู้พัฒนาระบบ `J-attapon` เฉพาะตำแหน่ง Footer
- ปรับหน้าตาให้เป็นมืออาชีพมากขึ้น
- เพิ่มสีสันแบบ Corporate Dashboard
- ใช้ Google Font: `IBM Plex Sans Thai Looped`
- ย้ายชุดปุ่มไปไว้ด้านล่างของแบบฟอร์ม
- เพิ่มปุ่ม `บันทึก`, `แก้ไข`, และ `ยกเลิก`
- บังคับกรอกชื่อผู้ประเมินก่อนบันทึก
- ทุกครั้งที่กดบันทึกจะสร้างรายการใหม่ใน Firebase Firestore
- ปุ่ม `แก้ไข` ใช้พากลับไปแก้ข้อมูลในฟอร์มก่อนส่ง
- ปุ่ม `ยกเลิก` ใช้ล้างข้อมูลแบบร่างที่กำลังกรอก โดยไม่ลบข้อมูลที่บันทึกไปแล้วใน Firebase
- รองรับข้อมูลจากพนักงานหลายคน
- เพิ่มแถบความคืบหน้าการกรอกแบบประเมิน
- ปรับแท็บและตารางให้ใช้งานง่ายบนมือถือ

## ไฟล์สำคัญ

- `index.html` หน้าเว็บหลัก
- `style.css` รูปแบบหน้าตาเว็บ
- `app.js` การทำงานของฟอร์มและ Firebase
- `firebase-config.js` ใส่ค่า Firebase config ของโปรเจกต์
- `firestore.rules` Rules สำหรับ Firestore
- `firebase.json` ตั้งค่า Firebase Hosting และ Firestore
- `assets/logo.svg` ไฟล์โลโก้บริษัท สามารถเปลี่ยนเป็นไฟล์โลโก้จริงของบริษัทได้

## การเปลี่ยนโลโก้บริษัท

ไฟล์โลโก้อยู่ที่:

```txt
assets/logo.svg
```

หากต้องการใช้โลโก้จริงของบริษัท ให้แทนที่ไฟล์นี้ด้วยไฟล์ชื่อเดิม หรือแก้ path ใน `index.html` ตรงส่วนนี้:

```html
<img src="assets/logo.svg" alt="โลโก้บริษัท" />
```

## การตั้งค่า Firebase

เปิดไฟล์ `firebase-config.js` แล้วใส่ค่าจริงจาก Firebase Console:

```js
window.AKRIVIS_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "akrivis-uat-webapp.firebaseapp.com",
  projectId: "akrivis-uat-webapp",
  storageBucket: "akrivis-uat-webapp.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};
```

Collection เริ่มต้นคือ:

```txt
akrivis_uat_records
```

## Deploy

รันคำสั่งนี้จากโฟลเดอร์โปรเจกต์:

```powershell
firebase deploy --only hosting
```

ถ้าต้องการ deploy rules ด้วย:

```powershell
firebase deploy --only firestore:rules
firebase deploy --only hosting
```

หรือ deploy ทั้งหมด:

```powershell
firebase deploy
```

## หมายเหตุสำคัญ

ระบบใช้ Google Font `IBM Plex Sans Thai Looped` ผ่านลิงก์จาก Google Fonts โดยไม่ได้แนบไฟล์ฟอนต์ไว้ใน ZIP
