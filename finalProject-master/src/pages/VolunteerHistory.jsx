import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const VolunteerHistory = () => {
  const [currentUser, setCurrentUser] = useState({ fullName: '', role: '' });
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);

        fetch('http://127.0.0.1:5000/api/requests')
          .then(res => res.json())
          .then(data => {
              // Only show tasks that are assigned to THIS volunteer and are COMPLETED
              const myHistory = data.filter(req => 
                  req.AssignedVolunteer === user.fullName && req.Status === 'Completed'
              );
              setHistoryData(myHistory);
          });
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px' }} /></Link>
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome {currentUser.role}<br/>{currentUser.fullName}</div>
        <Link to="/volunteer" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Back</Link>
      </header>

      <div style={{ padding: '30px 40px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>Volunteer History</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '15px 0', border: '1px solid #ddd', borderRadius: '40px', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
          <div>Date</div>
          <div>Senior</div>
          <div>Task</div>
          <div>Status</div>
        </div>

        {historyData.map((item) => (
          <div key={item.RequestID} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', textAlign: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
            <div>{new Date(item.CreatedAt).toLocaleDateString()}</div>
            <div>{item.SeniorName}</div>
            <div>{item.TaskDescription}</div>
            <div style={{ color: '#438e5e', fontWeight: 'bold' }}>{item.Status} ✅</div>
          </div>
        ))}
        {historyData.length === 0 && <p style={{ textAlign: 'center', marginTop: '30px' }}>No completed history yet!</p>}
      </div>
    </div>
  );
};

export default VolunteerHistory;