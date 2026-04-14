import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../images/login.png'; 
import logoImg from '../images/logo.png'; 

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin'); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') navigate('/admin');
    else if (role === 'volunteer') navigate('/volunteer');
    else if (role === 'senior') navigate('/senior');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0 }}>
      
      {/* --- Header (הסרגל הירוק העליון) --- */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Link to="/">
        <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
        </Link>
        
      </header>

      {/* --- תוכן מרכזי --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
        
        {/* תמונת ההתחברות (הדלת - שכבר כוללת את הלוגו בתוכה!) */}
        <img src={loginImg} alt="Welcome" style={{ width: '100%', maxWidth: '350px', marginBottom: '30px' }} />

        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* כפתורי בחירת תפקיד */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '10px' }}>
            <button type="button" onClick={() => setRole('admin')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: role === 'admin' ? '#438e5e' : '#e0e0e0', color: role === 'admin' ? 'white' : '#555', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.2s' }}>admin</button>
            <button type="button" onClick={() => setRole('volunteer')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: role === 'volunteer' ? '#438e5e' : '#e0e0e0', color: role === 'volunteer' ? 'white' : '#555', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.2s' }}>volunteer</button>
            <button type="button" onClick={() => setRole('senior')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: role === 'senior' ? '#438e5e' : '#e0e0e0', color: role === 'senior' ? 'white' : '#555', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.2s' }}>senior</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>Email</label>
            <input type="email" required style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '16px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>Password</label>
            <input type="password" required style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '16px' }} />
          </div>

          <button type="submit" style={{ backgroundColor: '#438e5e', color: 'white', padding: '16px', borderRadius: '8px', border: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', transition: '0.2s' }}>log in</button>
          
          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '16px' }}>
            Don't have an account? <Link to="/SignUp" style={{ color: '#0000ee', fontWeight: 'bold', textDecoration: 'none', marginLeft: '5px' }}>Sign-up</Link>
          </div>
        </form>
      </div>

      {/* --- Footer --- */}
      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px', lineHeight: '1.6', width: '100%' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default Login;