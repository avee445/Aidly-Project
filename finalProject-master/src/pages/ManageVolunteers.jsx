import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

const ManageVolunteers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ fullName: '', email: '', phone: '', address: '' });
    
    // NEW: State to track which filter is active ('All', 'Senior', or 'Volunteer')
    const [filter, setFilter] = useState('All'); 

    useEffect(() => {
        const savedUser = localStorage.getItem('aidlyUser');
        if (!savedUser || JSON.parse(savedUser).role !== 'Admin') {
            navigate('/login');
            return;
        }
        fetchActiveUsers();
    }, [navigate]);

    const fetchActiveUsers = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/users/active');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.userId);
        setEditForm({ 
            fullName: user.fullName, 
            email: user.email, 
            phone: user.phone || '', 
            address: user.address || '' 
        });
    };

    const handleSave = async (id) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/users/${id}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            if (res.ok) {
                alert("User updated successfully! ✅");
                setEditingUser(null);
                fetchActiveUsers(); // Refresh the list
            }
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    // NEW: Dynamically filter the users list based on the active button
    const filteredUsers = users.filter(user => {
        if (filter === 'All') return true;
        return user.userRole === filter;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Segoe UI, sans-serif' }}>
            <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '70px' }} /></Link>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Manage Users</div>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
            </header>

            <main style={{ flex: 1, padding: '40px 20px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>Active System Users</h2>
                
                {/* --- NEW: Filter Buttons --- */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button 
                        onClick={() => setFilter('All')}
                        style={{ 
                            padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #1e7e48', transition: '0.2s',
                            backgroundColor: filter === 'All' ? '#1e7e48' : 'white',
                            color: filter === 'All' ? 'white' : '#1e7e48'
                        }}
                    >
                        Show All
                    </button>
                    <button 
                        onClick={() => setFilter('Senior')}
                        style={{ 
                            padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #0d47a1', transition: '0.2s',
                            backgroundColor: filter === 'Senior' ? '#0d47a1' : 'white',
                            color: filter === 'Senior' ? 'white' : '#0d47a1'
                        }}
                    >
                        Seniors Only
                    </button>
                    <button 
                        onClick={() => setFilter('Volunteer')}
                        style={{ 
                            padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: '2px solid #1e7e48', transition: '0.2s',
                            backgroundColor: filter === 'Volunteer' ? '#1e7e48' : 'white',
                            color: filter === 'Volunteer' ? 'white' : '#1e7e48'
                        }}
                    >
                        Volunteers Only
                    </button>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>
                    {filteredUsers.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {/* We map over filteredUsers instead of the main users array */}
                            {filteredUsers.map(user => (
                                <div key={user.userId} style={{ display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                                    
                                    {editingUser !== user.userId ? (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>
                                                    {user.fullName} 
                                                    <span style={{ 
                                                        marginLeft: '10px', padding: '3px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold',
                                                        backgroundColor: user.userRole === 'Senior' ? '#e3f2fd' : '#f0fff4',
                                                        color: user.userRole === 'Senior' ? '#0d47a1' : '#1e7e48'
                                                    }}>
                                                        {user.userRole}
                                                    </span>
                                                </h4>
                                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '3px' }}><strong>Email:</strong> {user.email}</div>
                                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '3px' }}><strong>Phone:</strong> {user.phone || 'N/A'}</div>
                                                <div style={{ color: '#666', fontSize: '14px' }}><strong>Address:</strong> {user.address || 'N/A'}</div>
                                            </div>
                                            <button onClick={() => handleEditClick(user)} style={{ backgroundColor: '#f0ad4e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                                ✏️ Edit
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <h4 style={{ margin: '0 0 10px 0', color: '#1e7e48' }}>Editing {user.userRole}: {user.fullName}</h4>
                                            <input type="text" value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} placeholder="Full Name" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                            <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} placeholder="Email" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                            <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} placeholder="Phone Number" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                            <input type="text" value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} placeholder="Home Address" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                            
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                <button onClick={() => handleSave(user.userId)} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    Save Changes
                                                </button>
                                                <button onClick={() => setEditingUser(null)} style={{ backgroundColor: '#ccc', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#666', fontSize: '16px', textAlign: 'center' }}>No active users found for this category.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ManageVolunteers;