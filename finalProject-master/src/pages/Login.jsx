import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { lang } = useOutletContext(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 

  const texts = {
    he: {
      title: "התחברות למערכת",
      subtitle: "אנא הזן את פרטיך כדי להתחבר:",
      email: "אימייל",
      password: "סיסמה",
      selectRole: "-- בחר סוג משתמש --",
      senior: "קשיש",
      volunteer: "מתנדב",
      admin: "מנהל",
      loginBtn: "התחבר",
      errorMsg: "נא למלא אימייל, סיסמה ולבחור סוג משתמש."
    },
    en: {
      title: "System Login",
      subtitle: "Please enter your details to log in:",
      email: "Email",
      password: "Password",
      selectRole: "-- Select User Type --",
      senior: "Senior",
      volunteer: "Volunteer",
      admin: "Admin",
      loginBtn: "Log In",
      errorMsg: "Please fill in email, password, and select a user type."
    }
  };

  const t = texts[lang];

  const handleLoginSubmit = (e) => {
    e.preventDefault(); 
    if (!email || !password || !role) {
      alert(t.errorMsg);
      return;
    }
    if (role === 'senior') navigate('/senior');
    else if (role === 'volunteer') navigate('/volunteer');
    else if (role === 'admin') navigate('/admin');
  };

  return (
    <div style={{
      /* שמתי כאן קישור חדש ותקין לתמונה מדהימה! */
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '15px',
      marginTop: '10px',
      padding: '20px'
    }}>
      
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1e7e48', marginTop: 0 }}>{t.title}</h2>
        <p style={{ color: '#555' }}>{t.subtitle}</p>

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input 
            type="email" 
            placeholder={t.email} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', textAlign: lang === 'he' ? 'right' : 'left' }}
          />
          <input 
            type="password" 
            placeholder={t.password} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', textAlign: lang === 'he' ? 'right' : 'left' }}
          />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', textAlign: lang === 'he' ? 'right' : 'left' }}
          >
            <option value="">{t.selectRole}</option>
            <option value="senior">{t.senior}</option>
            <option value="volunteer">{t.volunteer}</option>
            <option value="admin">{t.admin}</option>
          </select>
          <button 
            type="submit" 
            style={{
              padding: '12px', fontSize: '18px', fontWeight: 'bold', backgroundColor: '#1e7e48',
              color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px'
            }}
          >
            {t.loginBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;