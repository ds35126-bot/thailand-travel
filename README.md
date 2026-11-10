# Thailand Stay — Frontend Demo

เว็บไซต์ตัวอย่างระบบค้นหาและจองที่พักในประเทศไทย สร้างด้วย HTML, CSS และ Vanilla JavaScript โดยไม่ใช้ฐานข้อมูลหรือ Backend

## ไฟล์ในโปรเจกต์
- `index.html` โครงสร้างหน้าเว็บและ dialog
- `styles.css` การออกแบบ Responsive
- `app.js` ข้อมูลที่พักตัวอย่าง การค้นหา และการจองผ่าน LocalStorage
- `vercel.json` การตั้งค่า Header พื้นฐานสำหรับ Vercel

## ทดลองบนเครื่อง
1. แตกไฟล์ ZIP
2. เปิดโฟลเดอร์ด้วย VS Code
3. ติดตั้งส่วนขยาย Live Server (ถ้ายังไม่มี)
4. คลิกขวา `index.html` แล้วเลือก Open with Live Server

หรือใช้คำสั่ง `npx serve .` จาก Terminal ในโฟลเดอร์โปรเจกต์

## Deploy บน Vercel (วิธี GitHub)
1. สมัคร/เข้าสู่ระบบ GitHub และ Vercel
2. สร้าง Repository ใหม่บน GitHub
3. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ไปไว้ที่ root ของ Repository (อย่าอัปโหลด ZIP อย่างเดียว)
4. เข้า Vercel แล้วเลือก Add New → Project
5. Import Git Repository ที่สร้างไว้
6. Framework Preset เลือก Other
7. Build Command และ Output Directory เว้นว่างได้ เพราะเป็น Static HTML
8. กด Deploy
9. เมื่อเสร็จแล้วเปิดโดเมน `.vercel.app` ที่ Vercel ให้มา
10. ทดสอบค้นหาที่พัก เปิดรายละเอียด ส่งแบบฟอร์มจอง และรีเฟรชเพื่อดู LocalStorage

## Deploy ด้วย Vercel CLI
ต้องติดตั้ง Node.js ก่อน จากนั้นเปิด Terminal ในโฟลเดอร์โปรเจกต์:
```bash
npm i -g vercel
vercel login
vercel
```
ตอบคำถาม CLI ตามขั้นตอนเพื่อสร้าง Preview Deployment หากต้องการ Production Deployment:
```bash
vercel --prod
```

## ข้อจำกัดและสิ่งที่ต้องทำก่อนรับจองจริง
**โปรเจกต์นี้เป็น Frontend Demo เท่านั้น** รายการจองเก็บใน LocalStorage ของ Browser ผู้ใช้แต่ละคน ไม่ได้ส่งไปยังโรงแรมหรือเซิร์ฟเวอร์ และไม่สามารถล็อกจำนวนห้องว่างหรือป้องกันการจองซ้ำข้ามอุปกรณ์ได้

ก่อนเปิดรับจองจริง ต้องเพิ่มอย่างน้อย:
- Backend/API และฐานข้อมูลกลาง หรือเชื่อมต่อ Booking Engine ของผู้ให้บริการ
- ระบบตรวจสอบห้องว่างแบบ atomic/transaction เพื่อป้องกัน overbooking
- ระบบยืนยันตัวตนและสิทธิ์ผู้ดูแล (ห้ามใช้รหัสผ่านฝังใน JavaScript)
- Payment Gateway ที่ได้รับอนุญาตและระบบ webhook ตรวจสอบผลชำระ
- การตรวจสอบข้อมูลฝั่ง Server, rate limiting, logging และการสำรองข้อมูล
- นโยบายความเป็นส่วนตัว/ประกาศการประมวลผลข้อมูลตาม PDPA และช่องทางติดต่อ
- ตรวจสอบราคา เงื่อนไขยกเลิก ภาษี ค่าธรรมเนียม และข้อมูลที่พักจริง

## หมายเหตุ
ภาพและฟอนต์โหลดจากผู้ให้บริการภายนอก (Unsplash และ Google Fonts) จึงต้องเชื่อมต่ออินเทอร์เน็ต หากใช้งานเชิงพาณิชย์ควรตรวจสอบสิทธิ์การใช้ภาพและจัดการ asset ให้เหมาะสม
