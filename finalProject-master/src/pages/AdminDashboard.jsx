import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: 'Admin', role: '' });
  const [stats, setStats] = useState({ pending: 0, ongoing: 0, completed: 0, volunteers: 0 });
  const [adminStats, setAdminStats] = useState({ chartValues: [0, 0, 0, 0, 0] });

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(savedUser);
    if (user.role !== 'Admin') {
      alert("Access Denied: This area is for Admins only.");
      navigate('/login');
      return;
    }

    setCurrentUser(user);

    fetch('http://127.0.0.1:5000/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.log(err));

    fetch('http://127.0.0.1:5000/api/admin-stats')
        .then(res => res.json())
        .then(data => setAdminStats(data))
        .catch(err => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('aidlyUser');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
      
      {/* --- Main Header --- */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <img src={logoImg} alt="Aidly" style={{ height: '70px', cursor: 'pointer' }} />
        </Link>
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', lineHeight: '1.2' }}>
          Welcome {currentUser.role}<br/>{currentUser.fullName}
        </div>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      {/* --- NEW: Sleek Navigation Bar --- */}
      <nav style={{ backgroundColor: '#2c3a4f', padding: '12px 30px', display: 'flex', gap: '30px', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <Link to="/admin" style={{ color: '#aedec5', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>📊 Dashboard</Link>
        <Link to="/admin/requests" style={{ color: 'white', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>📋 Request Queue</Link>
        <Link to="/admin/volunteers" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>👥 Pending Approvals</Link>
        <Link to="/new-request" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>📞 Record Request</Link>
        <Link to="/admin/manage-volunteers" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>⚙️ Manage Users</Link>
      </nav>

      {/* --- Main Analytics Content --- */}
      <div style={{ flex: 1, padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        
        <h2 style={{ fontSize: '28px', color: '#000', marginBottom: '25px', fontWeight: 'bold' }}>System Overview</h2>

        {/* 4-Column Statistics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '40px' }}>
          <div style={{ border: '2px solid #d9534f', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#fffcfc' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#d9534f' }}>{stats.pending}</span>
            <span style={{ fontSize: '14px', color: '#d9534f', fontWeight: 'bold' }}>Pending Requests</span>
          </div>
          <div style={{ border: '2px solid #f0ad4e', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#fffdf9' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#f0ad4e' }}>{stats.ongoing}</span>
            <span style={{ fontSize: '14px', color: '#f0ad4e', fontWeight: 'bold' }}>Ongoing Requests</span>
          </div>
          <div style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#f4fff8' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#1e7e48' }}>{stats.completed}</span>
            <span style={{ fontSize: '14px', color: '#1e7e48', fontWeight: 'bold' }}>Requests Completed</span>
          </div>
          <div style={{ border: '2px solid #333', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{stats.volunteers}</span>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Total Volunteers</span>
          </div>
        </div>

        {/* --- FIXED: Weekly Activity Chart (Labels Under Line) --- */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', color: '#333', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Weekly Activity
          </h3>
          
          {/* Top: Bars and Bottom Border */}
          <div style={{ display: 'flex', height: '180px', alignItems: 'flex-end', borderBottom: '2px solid #ccc' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', color: '#888', fontSize: '12px', paddingRight: '15px', borderRight: '1px solid #ccc', textAlign: 'right' }}>
              <span>{Math.max(...adminStats.chartValues, 5)}</span>
              <span>{Math.round(Math.max(...adminStats.chartValues, 5) / 2)}</span>
              <span>0</span>
            </div>
            
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', height: '100%' }}>
              {adminStats.chartValues.map((val, i) => {
                const maxDataPoint = Math.max(...adminStats.chartValues, 5); 
                const barHeight = (val / maxDataPoint) * 100;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '40px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e7e48', marginBottom: '5px' }}>{val}</span>
                    <div style={{ width: '100%', height: `${barHeight}%`, backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom: Text Labels strictly below the line */}
          <div style={{ display: 'flex', marginLeft: '45px', paddingTop: '10px' }}>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
              {adminStats.chartValues.map((_, i) => (
                <span key={i} style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', width: '40px', textAlign: 'center' }}>
                  Day {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;