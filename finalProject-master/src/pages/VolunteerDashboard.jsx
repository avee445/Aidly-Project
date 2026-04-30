import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: '', role: '' });
  const [availableTasks, setAvailableTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    // 1. Check if a user is logged in
    const savedUser = localStorage.getItem('aidlyUser');
    
    if (!savedUser) {
      alert("Please log in to access the dashboard.");
      navigate('/login');
      return; // Stop the code here
    }

    const user = JSON.parse(savedUser);

    // 2. Security Check: Make sure they are actually a Volunteer
    if (user.role !== 'Volunteer') {
      alert("Access Denied: This area is for Volunteers only.");
      navigate('/login');
      return;
    }

    setCurrentUser(user);

    // 3. Fetch data only if authenticated
    fetch('http://127.0.0.1:5000/api/requests')
      .then(res => res.json())
      .then(data => {
          // Tasks no one has taken yet
          setAvailableTasks(data.filter(t => t.Status === 'Waiting'));
          // Tasks specifically assigned to THIS volunteer
          setMyTasks(data.filter(t => t.AssignedVolunteer === user.fullName && t.Status === 'Assigned'));
      })
      .catch(err => console.error("Error fetching tasks:", err));
  }, [navigate]);

  const handleDone = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:5000/api/requests/${id}/complete`, { method: 'PUT' });
        if (res.ok) {
            alert("Great job! Task completed.");
            window.location.reload(); 
        }
    } catch (err) { alert("Error updating task."); }
  };

  const handleAccept = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:5000/api/requests/${id}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ volunteerName: currentUser.fullName })
        });
        if (res.ok) window.location.reload();
    } catch (err) { alert("Error accepting task."); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px' }} /></Link>
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome {currentUser.role}<br/>{currentUser.fullName}</div>
        <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/volunteer/history" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>History</Link>
            <Link to="/login" onClick={() => localStorage.removeItem('aidlyUser')} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Logout</Link>
        </div>
      </header>

      <div style={{ flex: 1, padding: '20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', margin: 0 }}>Volunteer Dashboard 💚</h2>
            <Link to="/" style={{ color: '#0000ee', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
        </div>

        {/* --- SECTION: My Current Active Tasks --- */}
        <h3 style={{ fontSize: '18px', color: '#1e7e48' }}>My Active Tasks</h3>
        {myTasks.length === 0 ? <p style={{ color: '#666' }}>No active tasks. Check available requests below!</p> : null}
        {myTasks.map(task => (
            <div key={task.RequestID} style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                <strong>Senior: {task.SeniorName}</strong><br/>
                Task: {task.TaskDescription}<br/>
                <button onClick={() => handleDone(task.RequestID)} style={{ width: '100%', backgroundColor: '#438e5e', color: 'white', padding: '10px', marginTop: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Mark Task as Done ✅
                </button>
            </div>
        ))}

        {/* --- SECTION: Available Tasks (Accept buttons) --- */}
        <h3 style={{ fontSize: '18px', marginTop: '30px' }}>Available Requests</h3>
        {availableTasks.length === 0 ? <p style={{ color: '#666' }}>No requests waiting right now. Good work!</p> : null}
        {availableTasks.map(task => (
            <div key={task.RequestID} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', marginBottom: '10px' }}>
                <div style={{ fontSize: '14px' }}>
                    <strong>{task.TaskDescription}</strong><br/>
                    Senior: {task.SeniorName} | Phone: {task.PhoneNumber}
                </div>
                <button onClick={() => handleAccept(task.RequestID)} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', marginTop: '10px', cursor: 'pointer', width: '100%' }}>
                    Accept Task
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerDashboard;