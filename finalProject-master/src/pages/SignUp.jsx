import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const { lang } = useOutletContext(); 

  const texts = {
    he: {
      title: "הרשמת מתנדב חדש",
      subtitle: "הצטרף לקהילה שלנו ועזור לקשישים באזורך 💚",
      fullName: "שם מלא",
      phone: "מספר טלפון",
      email: "אימייל",
      password: "סיסמה מועדפת",
      city: "עיר מגורים",
      submitBtn: "שלח בקשת התנדבות",
      backToLogin: "חזרה להתחברות",
      successMsg: "תודה! בקשתך נשלחה למנהל המערכת לאישור."
    },
    en: {
      title: "New Volunteer Sign Up",
      subtitle: "Join our community and help seniors in your area 💚",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email",
      password: "Password",
      city: "City of Residence",
      submitBtn: "Submit Volunteer Request",
      backToLogin: "Back to Login",
      successMsg: "Thank you! Your request has been sent to the admin for approval."
    }
  };

  const t = texts[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.successMsg);
    navigate('/login');
  };

  return (
    <div style={{
      /* רקע של ידיים תומכות (מתנדבים), עם פילטר כהה */
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format&fit=crop")',
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
      
      {/* הכרטיסייה הלבנה של הטופס */}
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1e7e48', marginTop: 0 }}>{t.title}</h2>
        <p style={{ color: '#555', marginBottom: '20px' }}>{t.subtitle}</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" placeholder={t.fullName} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', textAlign: lang === 'he' ? 'right' : 'left' }} />
          <input type="tel" placeholder={t.phone} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', direction: 'ltr', textAlign: lang === 'he' ? 'right' : 'left' }} />
          <input type="email" placeholder={t.email} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', textAlign: lang === 'he' ? 'right' : 'left' }} />
          <input type="password" placeholder={t.password} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', textAlign: lang === 'he' ? 'right' : 'left' }} />
          <input type="text" placeholder={t.city} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', textAlign: lang === 'he' ? 'right' : 'left' }} />

          <button type="submit" style={{ padding: '14px', backgroundColor: '#1e7e48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', marginTop: '10px' }}>
            {t.submitBtn}
          </button>
        </form>

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#5b5fc7', textDecoration: 'underline', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            {t.backToLogin}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;