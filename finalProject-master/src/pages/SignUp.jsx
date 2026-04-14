import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 
// ודא ששם התמונה תואם למה שיש לך בתיקייה (למשל signupa.png או שם אחר)
import signupImg from '../images/signupa.png'; 

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
    navigate('/login'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0 }}>
      
      {/* --- Header (הסרגל הירוק העליון - תבנית קבועה) --- */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
  <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
</Link>
      </header>

      {/* --- אזור התוכן המרכזי המפוצל --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        
        {/* צד שמאל - טופס ההרשמה הלבן והנקי */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <h2 style={{ color: '#000', marginBottom: '25px', fontSize: '32px', fontWeight: 'bold' }}>Create Account</h2>

            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '15px', color: '#333' }}>Full Name</label>
                <input type="text" required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '15px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '15px', color: '#333' }}>Email</label>
                <input type="email" required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '15px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '15px', color: '#333' }}>Password</label>
                <input type="password" required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '15px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '15px', color: '#333' }}>Confirm Password</label>
                <input type="password" required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '15px' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#438e5e', color: 'white', padding: '15px', borderRadius: '8px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', margin: '15px 0', transition: '0.2s' }}>sign up</button>
              
              <div style={{ textAlign: 'center', fontSize: '15px' }}>
                Already have an account? <Link to="/login" style={{ color: '#0000ee', fontWeight: 'bold', textDecoration: 'none', marginLeft: '5px' }}>Log In</Link>
              </div>
            </form>
          </div>

        </div>

        {/* צד ימין - תמונת הידיים והלב */}
        <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
          <img src={signupImg} alt="Aidly Volunteer" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

      </div>

      {/* --- Footer (הפוטר הכחול הקבוע) --- */}
      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px', lineHeight: '1.6', width: '100%' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default SignUp;