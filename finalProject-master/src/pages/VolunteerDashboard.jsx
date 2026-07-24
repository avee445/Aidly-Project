import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // NEW: Alerts
import logoImg from '../images/logo.png'; 

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: 'Volunteer', role: '' });
  const [availableRequests, setAvailableRequests] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (!savedUser) {
        navigate('/login');
        return;
    }
    const user = JSON.parse(savedUser);
    setCurrentUser(user);
    fetchData(user.fullName);
  }, [navigate]);

  const fetchData = (volunteerName) => {
    fetch('http://127.0.0.1:5000/api/requests')
      .then(res => res.json())
      .then(data => {
          setAvailableRequests(data.filter(req => req.Status === 'Waiting'));
          setMyTasks(data.filter(req => req.AssignedVolunteer === volunteerName && req.Status === 'Assigned'));
      })
      .catch(err => console.error(err));
  };

  const assignTask = (id) => {
    fetch(`http://127.0.0.1:5000/api/requests/${id}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteerName: currentUser.fullName })
    })
    .then(res => res.json())
    .then(() => fetchData(currentUser.fullName))
    .catch(err => console.error(err));
  };

  const completeTask = (id) => {
    fetch(`http://127.0.0.1:5000/api/requests/${id}/complete`, {
        method: 'PUT'
    })
    .then(res => res.json())
    .then(() => {
        // NEW: SweetAlert Success replaces old alert
        Swal.fire({
            icon: 'success',
            title: 'Task Completed!',
            text: 'Thank you for your help 💚',
            confirmButtonColor: '#438e5e'
        }).then(() => {
            navigate(`/volunteer/survey?requestId=${id}&partnerName=Senior`);
        });
    })
    .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('aidlyUser');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
      
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} /></Link>
        <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px' }}>
          Welcome {currentUser.role}<br/>{currentUser.fullName}
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/volunteer/history" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>History</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '40px' }}>Volunteer Dashboard 💚</h2>

        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#1e7e48' }}>My Active Tasks</h3>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px', marginBottom: '50px' }}>
            {myTasks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {myTasks.map(req => (
                        <div key={req.RequestID} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>{req.TaskDescription}</h4>
                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}><strong>Senior:</strong> {req.SeniorName}</div>
                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}><strong>Phone:</strong> {req.PhoneNumber}</div>
                                <div style={{ color: '#666', fontSize: '14px' }}><strong>Address:</strong> {req.Address}</div>
                                {req.SideNotes && (
                                    <div style={{ color: '#d9534f', fontSize: '14px', marginTop: '10px', fontStyle: 'italic' }}>📝 {req.SideNotes}</div>
                                )}
                            </div>
                            
                            {/* FIXED: Button changed to high-contrast Yellow */}
                            <button onClick={() => completeTask(req.RequestID)} style={{ backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                Mark as Complete ✅
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>No active tasks. Check available requests below!</p>
            )}
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#1e7e48' }}>Available Requests</h3>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>
            {availableRequests.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {availableRequests.map(req => (
                        <div key={req.RequestID} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>{req.TaskDescription}</h4>
                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}><strong>Urgency:</strong> {req.Urgency}</div>
                                <div style={{ color: '#666', fontSize: '14px' }}><strong>Address:</strong> {req.Address}</div>
                            </div>
                            <button onClick={() => assignTask(req.RequestID)} style={{ backgroundColor: '#438e5e', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Accept Task
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>No requests waiting right now. Good work!</p>
            )}
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;