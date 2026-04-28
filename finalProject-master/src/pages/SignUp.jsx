import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 
import signupImg from '../images/signupa.png'; 

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirm: '' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) return alert("Passwords do not match!");

    try {
        const response = await fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                fullName: formData.fullName, 
                email: formData.email, 
                password: formData.password, 
                role: 'Volunteer' // Defaulting to volunteer for this form
            })
        });

        if (response.ok) {
            alert("Account created successfully!");
            navigate('/login'); 
        } else {
            alert("Registration failed. Email might already exist.");
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, sans-serif', margin: 0 }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px' }} /></Link>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <h2 style={{ color: '#000', marginBottom: '25px', fontSize: '32px', fontWeight: 'bold' }}>Create Account</h2>
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
                <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Password</label>
                <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Confirm Password</label>
                <input type="password" required value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#438e5e', color: 'white', padding: '15px', borderRadius: '8px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', margin: '15px 0' }}>sign up</button>
              <div style={{ textAlign: 'center', fontSize: '15px' }}>Already have an account? <Link to="/login" style={{ color: '#0000ee', fontWeight: 'bold', textDecoration: 'none' }}>Log In</Link></div>
            </form>
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
          <img src={signupImg} alt="Aidly" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
        © 2026 Aidly All Rights Reserved.
      </footer>
    </div>
  );
};

export default SignUp;