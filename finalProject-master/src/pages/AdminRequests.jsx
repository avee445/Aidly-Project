import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [currentUser, setCurrentUser] = useState({ fullName: '', role: '' });
    const [selectedVolunteers, setSelectedVolunteers] = useState({});

    useEffect(() => {
        const savedUser = localStorage.getItem('aidlyUser');
        if (!savedUser) {
            alert("Please log in first!");
            navigate('/login');
            return;
        }

        const user = JSON.parse(savedUser);
        if (user.role !== 'Admin') {
            alert("Access Denied!");
            navigate('/login');
            return;
        }
        setCurrentUser(user);

        fetch('http://127.0.0.1:5000/api/requests')
            .then(res => res.json())
            .then(data => {
                const filteredAndSorted = data
                    .filter(req => req.Status !== 'Completed')
                    .sort((a, b) => (a.Status === 'Waiting' ? -1 : 1));
                setRequests(filteredAndSorted);
            })
            .catch(err => console.error("Error loading requests:", err));

        fetch('http://127.0.0.1:5000/api/volunteers')
            .then(res => res.json())
            .then(data => setVolunteers(data))
            .catch(err => console.error("Error loading volunteers:", err));
    }, [navigate]);

    const handleSave = async (requestId) => {
        const volunteerName = selectedVolunteers[requestId];
        if (!volunteerName) {
            alert("Please select a volunteer from the list first!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/requests/${requestId}/assign`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ volunteerName })
            });

            if (response.ok) {
                alert(`Database Updated! Task assigned to ${volunteerName}.`);
                window.location.reload(); 
            } else {
                alert("Failed to save assignment.");
            }
        } catch (error) {
            console.error("Connection error:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0 }}>
            <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} /></Link>
                <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', lineHeight: '1.2' }}>
                    Welcome {currentUser.role}<br/>{currentUser.fullName}
                </div>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>← Back to Dashboard</Link>
            </header>

            <div style={{ flex: 1, padding: '30px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ fontSize: '24px', color: '#000', marginBottom: '20px', fontWeight: 'bold' }}>📋 Request Queue</h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f6f8', borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: '#333', width: '25%' }}>Senior / Task</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: '#333', width: '20%' }}>Status</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: '#333', width: '35%' }}>Assign Volunteer</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: '#333', width: '20%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.RequestID} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px', textAlign: 'left' }}>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{req.SeniorName}</div>
                                        <div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>{req.TaskDescription}</div>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <span style={{ backgroundColor: req.Status === 'Waiting' ? '#f5a623' : '#438e5e', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                            {req.Status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <select 
                                            value={selectedVolunteers[req.RequestID] || req.AssignedVolunteer || ""}
                                            onChange={(e) => setSelectedVolunteers({...selectedVolunteers, [req.RequestID]: e.target.value})}
                                            style={{ padding: '8px', borderRadius: '20px', border: '1px solid #ccc', width: '90%', outline: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="">-- CHOOSE --</option>
                                            {volunteers.map(v => (
                                                <option key={v.UserID} value={v.FullName}>{v.FullName}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <button onClick={() => handleSave(req.RequestID)} style={{ backgroundColor: '#0000cc', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '40px', color: '#666', fontWeight: 'bold' }}>No active requests found! 🎉</p>
                    )}
                </div>
            </div>

            <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px', width: '100%' }}>
                © 2026 Aidly All Rights Reserved.<br />Developed with love by Ibrahem & Malek.
            </footer>
        </div>
    );
};

export default AdminRequests;