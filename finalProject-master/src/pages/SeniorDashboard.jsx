import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png';

const SeniorDashboard = () => {
  const myRequests = [
    { 
      date: "20/02/2026", 
      task: "Purchasing medications", 
      address: "12 Main St, Apt 4", 
      urgency: "High 🔴", 
      status: "Waiting for Volunteer ⏳", 
      isWaiting: true 
    },
    { 
      date: "24/02/2026", 
      task: "Fixing a leak in the sink", 
      address: "12 Main St, Apt 4", 
      urgency: "Medium 🟡", 
      status: "Completed ✅", 
      isWaiting: false 
    },
    { 
      date: "13/02/2026", 
      task: "Grocery Shopping", 
      address: "12 Main St, Apt 4", 
      urgency: "Low 🟢", 
      status: "Completed ✅", 
      isWaiting: false 
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Segoe UI, Tahoma, sans-serif', margin: 0 }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        
        <Link to="/">
  <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
</Link>
        <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px' }}>
          Welcome Mr.<br/>Abraham Cohen
        </div>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Logout</Link>
      </header>

      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>Hello, Mr. Cohen! 👋</h2>
          <Link to="/home" style={{ color: '#0000ff', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
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
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 2fr 2fr 1fr 2fr', 
            backgroundColor: '#eee', 
            padding: '15px 20px', 
            fontWeight: 'bold', 
            fontSize: '16px',
            textAlign: 'center'
          }}>
            <div>Date</div>
            <div>Task</div>
            <div>Address</div>
            <div>Urgency</div>
            <div>Status</div>
          </div>

          {myRequests.map((req, index) => (
            <div key={index} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 2fr 2fr 1fr 2fr', 
              padding: '20px', 
              alignItems: 'center', 
              textAlign: 'center',
              borderBottom: index < myRequests.length - 1 ? '1px solid #eee' : 'none'
            }}>
              <div style={{ color: '#888' }}>{req.date}</div>
              <div style={{ fontWeight: '600' }}>{req.task}</div>
              <div style={{ color: '#555' }}>{req.address}</div>
              <div>{req.urgency}</div>
              <div>
                <div style={{ 
                  color: req.isWaiting ? '#d9534f' : '#438e5e', 
                  fontWeight: 'bold',
                  backgroundColor: req.isWaiting ? '#fff5f5' : '#f0fff4',
                  padding: '8px',
                  borderRadius: '20px',
                  marginBottom: '5px'
                }}>
                  {req.status}
                </div>
                {/* כפתור משוב שמופיע רק כשהמשימה הושלמה */}
                {!req.isWaiting && (
                  <Link to="/senior/survey" style={{ color: '#0000ff', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
                    Rate Volunteer ⭐
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ backgroundColor: '#2c3a4f', color: 'white', textAlign: 'center', padding: '20px', fontSize: '14px', marginTop: '40px' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default SeniorDashboard;