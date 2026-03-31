# 🏡 Aidly - Smart Help, Close to Home

![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)
![Status](https://img.shields.io/badge/Status-Prototype_Phase-success)

[cite_start]**Aidly** היא מערכת חכמה וקהילתית המחברת בין אזרחים ותיקים הזקוקים לעזרה במטלות בית קטנות (כמו קניות, החלפת נורה או תמיכה טכנית) לבין מתנדבים זמינים בשכונה[cite: 58, 64]. 

פרויקט זה מפותח כפרויקט גמר, בדגש על חוויית משתמש (UX) מותאמת לגיל השלישי וניהול יעיל של מערך ההתנדבות.

---

## ✨ פיצ'רים מרכזיים (Key Features)

* [cite_start]**👵 ממשק לאזרח הוותיק:** טופס פשוט, ברור ונגיש ליצירת בקשות עזרה וצפייה בהיסטוריית הבקשות [cite: 74-79].
* [cite_start]**💚 לוח בקרת מתנדב:** צפייה במשימות זמינות, דיווח על סיום משימה ומתן משוב על החוויה [cite: 104-116].
* [cite_start]**🛡️ דאשבורד מנהל (Admin):** תור בקשות (Request Queue), מערכת לאישור מתנדבים חדשים (Vetting), ושיוך חכם (Matching) בין בקשה למתנדב [cite: 84-98].

---

## 🛠️ טכנולוגיות (Tech Stack)

* **צד לקוח (Frontend):** React.js, Vite, React-Router-DOM
* **עיצוב (UI/UX):** Custom CSS / Inline Styling (בהתאם לאפיון ב-Figma)
* **צד שרת ומסד נתונים (מתוכנן להמשך):** SQL Server / Node.js

---

## 🚀 התקנה והפעלה מקומית (Local Setup)

כדי להריץ את אב-הטיפוס של המערכת על המחשב המקומי, עקוב אחר השלבים הבאים:

1. **ודא שמותקן אצלך Node.js** על המחשב.
2. **פתח את תיקיית הפרויקט** בטרמינל (Terminal).
3. **התקן את חבילות התוכנה** על ידי הרצת הפקודה הבאה:
   ```bash
   npm install
הפעל את שרת הפיתוח:
npm run dev
היכנס לדפדפן בכתובת המופיעה בטרמינל (לרוב http://localhost:5173).

🗺️ מפת התמצאות באתר (System Navigation)
ניתן לנווט ישירות בין מסכי המערכת דרך הכתובות הבאות:
תפקיד / מסך,כתובת ניתוב (URL)
דף הבית (Landing Page),/ או /home
התחברות (Login),/login
אזרח ותיק (Senior),"/senior (דאשבורד), /senior/new-request (בקשה חדשה)"
מתנדב (Volunteer),"/volunteer (דאשבורד), /volunteer/history (היסטוריה)"
מנהל (Admin),"/admin (דאשבורד), /admin/requests (ניהול בקשות)"
👥 צוות הפרויקט (Project Team)

מפתחים: אבראהים עיאד ומאלק ספורי 


מנחת הפרויקט: אורלי בנגל 

שנת פיתוח: 2026

<p align="center">
<i>Developed with love for the community 💚</i>
</p>
