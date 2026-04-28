import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png';

const SeniorDashboard = () => {
  const [currentUser, setCurrentUser] = useState({ fullName: 'Senior', role: '' });
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    // 1. Get logged-in user info
    const savedUser = localStorage.getItem('aidlyUser');
    if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
    }

    // 2. Fetch all requests and filter for THIS senior
    fetch('http://127.0.0.1:5000/api/requests')
      .then(res => res.json())
      .then(data => {
          const user = JSON.parse(savedUser);
          // Only show requests where the SeniorName matches the logged-in user
          const filtered = data.filter(req => req.SeniorName === user.fullName);
          setMyRequests(filtered);
      })
      .catch(err => console.error("Error fetching requests:", err));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Segoe UI, Tahoma, sans-serif', margin: 0 }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} /></Link>
        <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px' }}>
          Welcome {currentUser.role}<br/>{currentUser.fullName}
        </div>
        <Link to="/login" onClick={() => localStorage.removeItem('aidlyUser')} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Logout</Link>
      </header>

      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>Hello, {currentUser.fullName}! 👋</h2>
        </div>

        <Link to="/senior/new-request" style={{ 
          display: 'block', backgroundColor: '#438e5e', color: 'white', textDecoration: 'none',
          textAlign: 'center', padding: '25px', borderRadius: '15px', fontSize: '24px', fontWeight: 'bold',
          marginBottom: '50px', boxShadow: '0 6px 15px rgba(67, 142, 94, 0.3)'
        }}>
          + Request New Help Now
        </Link>

        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#1e7e48' }}>My Recent Requests</h3>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', backgroundColor: '#eee', padding: '15px 20px', fontWeight: 'bold', textAlign: 'center' }}>
            <div>Date</div>
            <div>Task</div>
            <div>Urgency</div>
            <div>Status</div>
          </div>

          {myRequests.length > 0 ? myRequests.map((req, index) => (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', padding: '20px', alignItems: 'center', textAlign: 'center', borderBottom: '1px solid #eee' }}>
              <div style={{ color: '#888' }}>{new Date(req.CreatedAt).toLocaleDateString()}</div>
              <div style={{ fontWeight: '600' }}>{req.TaskDescription}</div>
              <div>{req.Urgency}</div>
              <div>
                <div style={{ 
                  color: req.Status === 'Waiting' ? '#d9534f' : '#438e5e', 
                  fontWeight: 'bold',
                  backgroundColor: req.Status === 'Waiting' ? '#fff5f5' : '#f0fff4',
                  padding: '8px', borderRadius: '20px'
                }}>
                  {req.Status}
                </div>
              </div>
            </div>
          )) : <p style={{ padding: '20px', textAlign: 'center' }}>No requests found. Create one above!</p>}
        </div>
      </main>

      <footer style={{ backgroundColor: '#2c3a4f', color: 'white', textAlign: 'center', padding: '20px', fontSize: '14px', marginTop: '40px' }}>
        © 2026 Aidly All Rights Reserved.<br />Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default SeniorDashboard;