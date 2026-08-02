import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

const AdminRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [filter, setFilter] = useState('Waiting'); // Default to showing tasks that need help
    
    // States for assigning a volunteer manually
    const [assigningId, setAssigningId] = useState(null);
    const [selectedVolunteer, setSelectedVolunteer] = useState('');

    useEffect(() => {
        const savedUser = localStorage.getItem('aidlyUser');
        if (!savedUser || JSON.parse(savedUser).role !== 'Admin') {
            navigate('/login');
            return;
        }
        fetchRequests();
        fetchActiveVolunteers();
    }, [navigate]);

    const fetchRequests = async () => {
        try {
            const res = await fetch('https://aidly-3wxx.onrender.com/api/requests');
            const data = await res.json();
            setRequests(data);
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };
    const fetchActiveVolunteers = async () => {
        try {
            const res = await fetch('https://aidly-3wxx.onrender.com/api/users/active');
            const data = await res.json();
            console.log("Active users fetched:", data); 
            
            setVolunteers(data.filter(user => 
                (user.userRole && user.userRole.toLowerCase() === 'volunteer') || 
                (user.UserRole && user.UserRole.toLowerCase() === 'volunteer')
            ));
        } catch (err) {
            console.error("Error fetching volunteers:", err);
        }
    };

   

    const handleAssign = async (requestId) => {
        if (!selectedVolunteer) return alert("Please select a volunteer first!");

        try {
            const res = await fetch(`https://aidly-3wxx.onrender.com/api/requests/${requestId}/assign`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ volunteerName: selectedVolunteer })
            });
            if (res.ok) {
                alert("Volunteer assigned successfully! ✅");
                setAssigningId(null);
                setSelectedVolunteer('');
                fetchRequests(); // Refresh the list
            }
        } catch (err) {
            console.error("Error assigning volunteer:", err);
        }
    };

    const handleForceComplete = async (requestId) => {
        if (window.confirm("Are you sure you want to mark this task as completed?")) {
            try {
                const res = await fetch(`https://aidly-3wxx.onrender.com/api/requests/${requestId}/complete`, {
                    method: 'PUT'
                });
                if (res.ok) {
                    fetchRequests();
                }
            } catch (err) {
                console.error("Error completing request:", err);
            }
        }
    };

    // Filter logic
    const filteredRequests = requests.filter(req => {
        if (filter === 'All') return true;
        return req.Status === filter;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Segoe UI, sans-serif' }}>
            
            {/* Standardized Header */}
            <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '70px' }} /></Link>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Request Queue</div>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
            </header>

            <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>System Help Requests</h2>
                
                {/* Status Filter Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button onClick={() => setFilter('Waiting')} style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #d9534f', transition: '0.2s', backgroundColor: filter === 'Waiting' ? '#d9534f' : 'white', color: filter === 'Waiting' ? 'white' : '#d9534f' }}>
                        Needs Assignment (Waiting)
                    </button>
                    <button onClick={() => setFilter('Assigned')} style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #f0ad4e', transition: '0.2s', backgroundColor: filter === 'Assigned' ? '#f0ad4e' : 'white', color: filter === 'Assigned' ? 'white' : '#f0ad4e' }}>
                        Ongoing (Assigned)
                    </button>
                    <button onClick={() => setFilter('Completed')} style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #1e7e48', transition: '0.2s', backgroundColor: filter === 'Completed' ? '#1e7e48' : 'white', color: filter === 'Completed' ? 'white' : '#1e7e48' }}>
                        Completed
                    </button>
                    <button onClick={() => setFilter('All')} style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #333', transition: '0.2s', backgroundColor: filter === 'All' ? '#333' : 'white', color: filter === 'All' ? 'white' : '#333' }}>
                        Show All
                    </button>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>
                    {filteredRequests.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {filteredRequests.map(req => (
                                <div key={req.RequestID} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: req.Status === 'Waiting' ? '#fffcfc' : req.Status === 'Completed' ? '#f4fff8' : '#fffdf9' }}>
                                    
                                    {/* Left Side: Request Details */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <h4 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{req.TaskDescription}</h4>
                                            <span style={{ padding: '3px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#e0e0e0', color: '#333' }}>
                                                Urgency: {req.Urgency.split(' ')[0]} {/* Grabs the emoji */}
                                            </span>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', color: '#555' }}>
                                            <div><strong>Senior:</strong> {req.SeniorName}</div>
                                            <div><strong>Date:</strong> {new Date(req.CreatedAt).toLocaleDateString()}</div>
                                            <div><strong>Phone:</strong> {req.PhoneNumber}</div>
                                            <div><strong>Address:</strong> {req.Address}</div>
                                        </div>

                                        {req.SideNotes && (
                                            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff', borderLeft: '4px solid #1e7e48', fontSize: '13px', fontStyle: 'italic', color: '#555' }}>
                                                <strong>Side Note:</strong> {req.SideNotes}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Side: Admin Actions & Status */}
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                                        
                                        {/* Status Badge */}
                                        <div style={{ padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center', width: '100%',
                                            backgroundColor: req.Status === 'Waiting' ? '#f8d7da' : req.Status === 'Completed' ? '#d4edda' : '#fff3cd',
                                            color: req.Status === 'Waiting' ? '#721c24' : req.Status === 'Completed' ? '#155724' : '#856404'
                                        }}>
                                            {req.Status}
                                        </div>

                                        {/* Action: Waiting */}
                                        {req.Status === 'Waiting' && (
                                            assigningId === req.RequestID ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                                    <select 
                                                        value={selectedVolunteer} 
                                                        onChange={(e) => setSelectedVolunteer(e.target.value)}
                                                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                    >
                                                        <option value="">Select Volunteer...</option>
                                                        {volunteers.map(v => (
                                                            <option key={v.userId || v.UserID} value={v.fullName || v.FullName}>
                                                                {v.fullName || v.FullName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                     
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <button onClick={() => handleAssign(req.RequestID)} style={{ flex: 1, backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                                                        <button onClick={() => setAssigningId(null)} style={{ flex: 1, backgroundColor: '#ccc', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button onClick={() => setAssigningId(req.RequestID)} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
                                                    Assign Volunteer
                                                </button>
                                            )
                                        )}

                                        {/* Action: Assigned */}
                                        {req.Status === 'Assigned' && (
                                            <div style={{ width: '100%', textAlign: 'right' }}>
                                                <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                                                    <strong>Assigned To:</strong><br/> {req.AssignedVolunteer}
                                                </div>
                                                <button onClick={() => handleForceComplete(req.RequestID)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                                                    Force Complete
                                                </button>
                                            </div>
                                        )}

                                        {/* Action: Completed */}
                                        {req.Status === 'Completed' && (
                                            <div style={{ fontSize: '13px', color: '#666', textAlign: 'right' }}>
                                                Helped by: <strong>{req.AssignedVolunteer}</strong>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#666', fontSize: '16px', textAlign: 'center', padding: '40px 0' }}>No requests found for this filter.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminRequests;