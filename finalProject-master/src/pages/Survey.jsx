import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

const Survey = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <img src={logoImg} alt="Aidly" style={{ height: '50px' }} />
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Welcome Mr.<br/>Cohen</div>
        <div style={{ width: '50px' }}></div>
      </header>

      <div style={{ padding: '40px 20px', flex: 1, textAlign: 'center' }}>
        <h1 style={{ color: '#438e5e', fontSize: '40px', margin: '0' }}>Congrats!🎉</h1>
        <p style={{ fontSize: '20px', margin: '20px 0' }}>How was your experience<br/>helping Mr.Jones?</p>

        {/* כוכבי דירוג */}
        <div style={{ fontSize: '40px', color: '#000', marginBottom: '30px', letterSpacing: '10px' }}>
          ★★★★★
        </div>

        <textarea 
          placeholder="Tell us how it went ...."
          style={{ width: '100%', maxWidth: '400px', height: '150px', padding: '15px', borderRadius: '15px', border: '1px solid #ccc', fontSize: '16px', marginBottom: '30px', fontFamily: 'inherit' }}
        />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/senior')} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            ✅ SubmitSurvey
          </button>
          <button onClick={() => navigate('/senior')} style={{ backgroundColor: '#ff0000', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: 'white', textAlign: 'center', padding: '15px', fontSize: '12px' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default Survey;