import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ fullName: '', role: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    // Load pending list from DB
    fetch('http://127.0.0.1:5000/api/volunteers/pending')
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // --- The Action Function (Handles both Approve and Reject) ---
  const handleAction = async (userId, userName, action) => {
    console.log(`Attempting to ${action} user:`, userId); // Check F12 console!

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/volunteers/${userId}/${action}`, {
        method: 'PUT'
      });

      if (response.ok) {
        alert(`Success! ${userName} has been ${action === 'approve' ? 'Approved' : 'Rejected'}.`);
        // Remove from the list on screen
        setVolunteers(prev => prev.filter(v => v.UserID !== userId));
      } else {
        const errorText = await response.text();
        alert("Server Error: " + errorText);
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px' }} /></Link>
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Welcome {currentUser.role}<br/>{currentUser.fullName}
        </div>
        <Link to="/login" onClick={() => localStorage.removeItem('aidlyUser')} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Logout</Link>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>👥 Volunteer Approvals</h2>
          <Link to="/admin" style={{ color: '#0000ee', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
        </div>

        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((vol) => (
                <tr key={vol.UserID} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{vol.FullName}</td>
                  <td style={{ padding: '15px' }}>{vol.Email}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => handleAction(vol.UserID, vol.FullName, 'approve')}
                        style={{ backgroundColor: '#438e5e', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(vol.UserID, vol.FullName, 'reject')}
                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {volunteers.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No pending volunteers! 🎉</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminVolunteers;