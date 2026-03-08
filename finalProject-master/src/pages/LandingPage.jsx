import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const LandingPage = () => {
  const { lang } = useOutletContext(); 

  const texts = {
    he: {
      title: "ברוכים הבאים למערכת Aidly",
      subtitle: "מערכת חכמה לחיבור בין קשישים למתנדבים בקהילה.",
      needHelp: "אני זקוק לעזרה 👴",
      wantToVolunteer: "אני רוצה להתנדב 💚",
      login: "כבר רשום? התחבר כאן"
    },
    en: {
      title: "Welcome to Aidly",
      subtitle: "A smart system connecting seniors with community volunteers.",
      needHelp: "I Need Help 👴",
      wantToVolunteer: "I Want to Volunteer 💚",
      login: "Already registered? Login here"
    }
  };

  const t = texts[lang];

  return (
    <div style={{
      /* תמונה חדשה ויפה של קהילה, עם פילטר כהה עדין כדי שהטקסט הלבן יבלוט */
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '80vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginTop: '10px'
    }}>
      
      {/* הטקסט עכשיו בלבן כדי לבלוט על הרקע */}
      <h1 style={{ fontSize: '4rem', color: '#ffffff', margin: '0 0 15px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        {t.title}
      </h1>
      
      <p style={{ fontSize: '24px', color: '#f0f0f0', maxWidth: '600px', marginBottom: '50px', fontWeight: '500', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
        {t.subtitle}
      </p>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        flexWrap: 'wrap'
      }}>
        
        <Link to="/senior" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#e74c3c', // צבע אדום בולט לקשישים
            color: 'white',
            padding: '20px 40px',
            borderRadius: '10px',
            fontSize: '22px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            {t.needHelp}
          </div>
        </Link>

        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#1e7e48', // ירוק למתנדבים
            color: 'white',
            padding: '20px 40px',
            borderRadius: '10px',
            fontSize: '22px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            {t.wantToVolunteer}
          </div>
        </Link>

      </div>

      <div style={{ marginTop: '50px' }}>
        <Link to="/login" style={{ 
          color: '#ffffff', 
          fontSize: '18px', 
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '10px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          border: '1px solid white',
          transition: 'background-color 0.3s'
        }}>
          {t.login}
        </Link>
      </div>
      
    </div>
  );
};

export default LandingPage;