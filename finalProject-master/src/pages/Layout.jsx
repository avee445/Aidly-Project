import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  // מגדירים עברית ('he') כברירת מחדל כדי שהמרצה תהיה מרוצה
  const [lang, setLang] = useState('he');

  // פונקציה שמחליפה בין השפות
  const toggleLanguage = () => {
    setLang(lang === 'he' ? 'en' : 'he');
  };

  // מילון תרגומים קטן לטמפלייט עצמו (לתפריט ולפוטר)
  const texts = {
    he: {
      home: "דף הבית",
      login: "התחברות",
      signup: "הרשמה למתנדבים",
      btnText: "English 🌐",
      footerRights: "© 2026 כל הזכויות שמורות למערכת Aidly.",
      footerDevs: "פותח באהבה על ידי איברהים ומאלק."
    },
    en: {
      home: "Home",
      login: "Login",
      signup: "Volunteer Sign Up",
      btnText: "עברית 🌐",
      footerRights: "© 2026 Aidly All Rights Reserved.",
      footerDevs: "Developed with love by Ibrahem & Malek."
    }
  };

  const t = texts[lang]; // שולף את הטקסטים לפי השפה שנבחרה

  return (
    // משנה את כיוון האתר אוטומטית: RTL לעברית, LTR לאנגלית
    <div className="layout-container" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      
      <header className="main-header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Aidly 🤝</h1>
          </Link>
          
          <nav className="main-nav">
            <Link to="/">{t.home}</Link>
            <Link to="/login">{t.login}</Link>
            <Link to="/signup">{t.signup}</Link>
            
            {/* כפתור החלפת השפה שלנו! */}
            <button onClick={toggleLanguage} className="lang-btn">
              {t.btnText}
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {/* מעביר את המידע על השפה הנוכחית לכל שאר המסכים במערכת! */}
        <Outlet context={{ lang }} /> 
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <p>{t.footerRights}</p>
          <p>{t.footerDevs}</p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;