import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: 'Admin', role: '' });
  const [stats, setStats] = useState({ seniorsWaiting: 0, newVolunteers: 0 });
  const [adminStats, setAdminStats] = useState({ successRate: '0%', chartValues: [0, 0, 0, 0, 0] });

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    fetch('http://127.0.0.1:5000/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.log(err));

    fetch('http://127.0.0.1:5000/api/admin-stats')
        .then(res => res.json())
        .then(data => setAdminStats(data))
        .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aidlyUser');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0 }}>
      
      {/* --- Header --- */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
        </Link>
        
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', lineHeight: '1.2' }}>
          Welcome {currentUser.role}<br/>{currentUser.fullName}
        </div>
        <Link to="/login" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }}>
          Logout
        </Link>
      </header>

      {/* --- Main Content --- */}
      <div style={{ flex: 1, padding: '30px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        <h2 style={{ fontSize: '28px', color: '#000', marginBottom: '25px', fontWeight: 'bold' }}>Admin Dashboard</h2>

        {/* --- 1. Statistics (Dynamic) --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '35px' }}>
          <div style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#1e7e48' }}>{stats.seniorsWaiting}</span>
            <span style={{ fontSize: '16px', color: '#1e7e48', fontWeight: 'bold' }}>Seniors Waiting</span>
          </div>
          <div style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#1e7e48' }}>{stats.newVolunteers}</span>
            <span style={{ fontSize: '16px', color: '#1e7e48', fontWeight: 'bold' }}>New Volunteers</span>
          </div>
          <div style={{ border: '2px solid #333', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{adminStats.successRate}</span>
            <span style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>Success Rate</span>
          </div>
        </div>

        {/* --- 2. Navigation Cards --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>📋 Request Queue</h3>
              <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>View and manage open tasks from seniors.</p>
            </div>
            <Link to="/admin/requests" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Manage Requests</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>👥 Pending Volunteers</h3>
              <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>Approve new users waiting to join.</p>
            </div>
            <Link to="/admin/volunteers" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>View Approvals</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>📞 New Call</h3>
              <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>Manually record a request for a senior.</p>
            </div>
            <Link to="/new-request" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>+ Record Request</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>👥 Manage Volunteers</h3>
              <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>Edit statuses and manage active volunteers.</p>
            </div>
            <Link to="/admin/manage-volunteers" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Edit Volunteers</Link>
          </div>
        </div>

        {/* --- 3. Weekly Activity Chart (FIXED SPACING) --- */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', color: '#333', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Weekly Activity
          </h3>
          
          <div style={{ display: 'flex', height: '200px', alignItems: 'flex-end', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
            
            {/* Dynamic Y-Axis Labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', color: '#888', fontSize: '12px', paddingRight: '15px', borderRight: '1px solid #ddd', textAlign: 'right' }}>
              <span>{Math.max(...adminStats.chartValues, 5)}</span>
              <span>{Math.round(Math.max(...adminStats.chartValues, 5) / 2)}</span>
              <span>0</span>
            </div>
            
            {/* --- THIS IS THE FIXED BAR CHART CONTAINER --- */}
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', gap: '35px', alignItems: 'flex-end', height: '100%' }}>
              {adminStats.chartValues.map((val, i) => {
                const maxDataPoint = Math.max(...adminStats.chartValues, 5); 
                const barHeight = (val / maxDataPoint) * 100;

                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '40px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e7e48', marginBottom: '5px' }}>{val}</span>
                    <div style={{ 
                        width: '100%', 
                        height: `${barHeight}%`, 
                        backgroundColor: '#aedec5', 
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.5s ease' 
                    }}></div>
                    <span style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontWeight: 'bold' }}>Day {i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
        © 2026 Aidly All Rights Reserved.<br />Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default AdminDashboard;