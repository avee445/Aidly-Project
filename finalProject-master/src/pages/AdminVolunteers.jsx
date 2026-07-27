import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

const AdminVolunteers = () => {
    const navigate = useNavigate();
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('aidlyUser');
        if (!savedUser || JSON.parse(savedUser).role !== 'Admin') {
            navigate('/login');
            return;
        }
        fetchPendingUsers();
    }, [navigate]);

    const fetchPendingUsers = async () => {
        try {
            // Pointing to our new universal backend route
            const res = await fetch('http://127.0.0.1:5000/api/users/pending');
            const data = await res.json();
            setPendingUsers(data);
        } catch (err) {
            console.error("Error fetching pending users:", err);
        }
    };

    const handleAction = async (id, action) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/users/${id}/${action}`, {
                method: 'PUT'
            });
            if (res.ok) {
                alert(`User ${action === 'approve' ? 'Approved ✅' : 'Rejected ❌'}`);
                fetchPendingUsers(); // Refresh the list
            }
        } catch (err) {
            console.error(`Error processing ${action}:`, err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Segoe UI, sans-serif' }}>
            <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '70px' }} /></Link>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Pending Approvals</div>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
            </header>

            <main style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>Account Approvals Queue</h2>
                
                <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>
                    {pendingUsers.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {pendingUsers.map(user => (
                                <div key={user.userId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>{user.fullName}</h4>
                                        <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Email: {user.email}</div>
                                        <div style={{ 
                                            display: 'inline-block', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold',
                                            backgroundColor: user.userRole === 'Senior' ? '#e3f2fd' : '#f0fff4',
                                            color: user.userRole === 'Senior' ? '#0d47a1' : '#1e7e48'
                                        }}>
                                            Role: {user.userRole}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleAction(user.userId, 'approve')} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                            Approve
                                        </button>
                                        <button onClick={() => handleAction(user.userId, 'reject')} style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#666', fontSize: '16px', textAlign: 'center' }}>No pending users in the queue. All caught up!</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminVolunteers;