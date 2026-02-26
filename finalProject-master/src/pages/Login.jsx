import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate(); 
  
  // משתנה ששומר את סוג המשתמש שנבחר (ברירת המחדל היא מנהל)
  const [role, setRole] = useState('admin');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // ניתוב חכם לפי סוג המשתמש
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'volunteer') {
      navigate('/volunteer');
    } else if (role === 'senior') {
      navigate('/senior');
    }
  };

  return (
    <div className="login-container">
       <div className="door-wrapper">
         <img src="/src/images/login.png" alt="Welcome to Aidly" className="door-img" />
       </div>

       <form onSubmit={handleLogin} className="login-form">
          {/* תפריט בחירת סוג משתמש */}
          <select 
            className="login-input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            required
            style={{ cursor: 'pointer' }}
          >
            <option value="senior">👴 התחברות כקשיש</option>
            <option value="volunteer">💚 התחברות כמתנדב</option>
            <option value="admin">⚙️ התחברות כמנהל</option>
          </select>

          <input type="text" placeholder="Username" className="login-input" required />
          <input type="password" placeholder="Password" className="login-input" required />

          <button type="submit" className="login-btn">Log In</button>

          <div className="login-links">
            <a href="#" className="forgot-pass">Forget Password?</a>
            <a href="/SignUp" className="forgot-pass">Don't have an account?</a>
          </div>
       </form>
    </div>
  );
};

export default Login;