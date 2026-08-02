import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // NEW: Beautiful Alerts
import logoImg from '../images/logo.png'; 
import signupImg from '../images/signupa.png'; 

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    fullName: '', email: '', password: '', confirm: '', role: 'Volunteer', phone: '', address: '' 
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get('role');
    if (roleParam) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [location]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
        // NEW: SweetAlert Error
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match!',
            confirmButtonColor: '#438e5e'
        });
    }

    try {
        const response = await fetch('https://aidly-3wxx.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // NEW: SweetAlert Success
            Swal.fire({
                icon: 'success',
                title: 'Welcome to Aidly!',
                text: 'Account created successfully.',
                confirmButtonColor: '#438e5e'
            }).then(() => {
                navigate('/login'); 
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'This email might already exist.',
                confirmButtonColor: '#d9534f'
            });
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '70px' }} /></Link>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>← Back</Link>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <h2 style={{ color: '#000', marginBottom: '25px', fontSize: '32px', fontWeight: 'bold' }}>Create Account</h2>
            
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>I want to sign up as a:</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setFormData({...formData, role: 'Volunteer'})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #438e5e', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: '0.3s', backgroundColor: formData.role === 'Volunteer' ? '#438e5e' : 'white', color: formData.role === 'Volunteer' ? 'white' : '#438e5e' }}>Volunteer</button>
                  <button type="button" onClick={() => setFormData({...formData, role: 'Senior'})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #438e5e', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: '0.3s', backgroundColor: formData.role === 'Senior' ? '#438e5e' : 'white', color: formData.role === 'Senior' ? 'white' : '#438e5e' }}>Senior</button>
                </div>
              </div>

              <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              <input type="text" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              <input type="text" placeholder="Home Address" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              <input type="password" placeholder="Password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              <input type="password" placeholder="Confirm Password" required value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
              
              <button type="submit" style={{ backgroundColor: '#438e5e', color: 'white', padding: '15px', borderRadius: '8px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', margin: '15px 0' }}>Sign Up</button>
              <div style={{ textAlign: 'center', fontSize: '15px' }}>Already have an account? <Link to="/login" style={{ color: '#0000ee', fontWeight: 'bold', textDecoration: 'none' }}>Log In</Link></div>
            </form>
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
          <img src={signupImg} alt="Aidly" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;