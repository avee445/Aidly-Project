import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const LandingPage = () => {
  const buttonStyle = {
    backgroundColor: '#438e5e',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    width: '350px',
    cursor: 'pointer',
    marginBottom: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none' // מבטל קו תחתי של לינקים
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', margin: 0 }}>
      
      {/* Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        
        {/* Logo & Title - עטפנו את הכל בלינק לדף הבית */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <h1 style={{ fontSize: '70px', color: '#1e7e48', margin: 0 }}>Aidly</h1>
            <img src={logoImg} alt="logo" style={{ height: '70px' }} />
          </Link>
          <p style={{ fontSize: '20px', color: '#333', maxWidth: '400px', margin: '20px auto' }}>
            A smart system connecting seniors with community volunteers.
          </p>
        </div>

        {/* Buttons Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          
          <Link to="/volunteer" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>I want to Volunteer</button>
          </Link>

          <Link to="/senior" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>I need help</button>
          </Link>

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>log in</button>
          </Link>

          {/* כפתור חירום/שיחה */}
          <div style={{ 
            backgroundColor: '#5d6d4e', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '10px', 
            width: '350px', 
            textAlign: 'center',
            marginTop: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{ fontWeight: 'bold' }}>☎️ Need Help Now? Call Us</div>
            <div style={{ fontSize: '18px' }}>050-999-9999</div>
          </div>
        </div>
      </div>

      {/* Footer - הוספנו כאן את הפוטר הכהה */}
      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
        <div>© 2026 Aidly All Rights Reserved.</div>
        <div style={{ marginTop: '5px', fontSize: '12px' }}>Developed with love by Ibrahem & Malek.</div>
      </footer>
      
    </div>
  );
};

export default LandingPage;