import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../images/login.png'; 
import logoImg from '../images/logo.png'; 

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Check if the role matches the button selected
            if (data.user.role.toLowerCase() !== role.toLowerCase()) {
                alert(`Error: This account is registered as a ${data.user.role}, not an ${role}.`);
                return;
            }
            
            localStorage.setItem('aidlyUser', JSON.stringify(data.user));
            if (role === 'admin') navigate('/admin');
            else if (role === 'volunteer') navigate('/volunteer');
            else if (role === 'senior') navigate('/senior');
        } else {
            alert(data.message || "Invalid credentials");
        }
    } catch (err) {
        alert("Connection error to server");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px' }} /></Link>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
        <img src={loginImg} alt="Welcome" style={{ width: '100%', maxWidth: '350px', marginBottom: '30px' }} />
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button type="button" onClick={() => setRole('admin')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: role === 'admin' ? '#438e5e' : '#e0e0e0', color: role === 'admin' ? 'white' : '#555', cursor: 'pointer', fontWeight: 'bold' }}>admin</button>
            <button type="button" onClick={() => setRole('volunteer')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: role === 'volunteer' ? '#438e5e' : '#e0e0e0', color: role === 'volunteer' ? 'white' : '#555', cursor: 'pointer', fontWeight: 'bold' }}>volunteer</button>
            <button type="button" onClick={() => setRole('senior')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: role === 'senior' ? '#438e5e' : '#e0e0e0', color: role === 'senior' ? 'white' : '#555', cursor: 'pointer', fontWeight: 'bold' }}>senior</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }} />
          </div>

          <button type="submit" style={{ backgroundColor: '#438e5e', color: 'white', padding: '16px', borderRadius: '8px', border: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>log in</button>
          <div style={{ textAlign: 'center', fontSize: '16px' }}>Don't have an account? <Link to="/SignUp" style={{ color: '#0000ee', fontWeight: 'bold', textDecoration: 'none' }}>Sign-up</Link></div>
        </form>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
        © 2026 Aidly All Rights Reserved.
      </footer>
    </div>
  );
};

export default Login;