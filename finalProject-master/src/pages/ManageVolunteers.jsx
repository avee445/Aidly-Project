import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const ManageVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ fullName: '', email: '', phone: '', address: '' });

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/volunteers')
            .then(res => res.json())
            .then(setVolunteers);
    }, []);

 const startEdit = (vol) => {
    console.log("Loading volunteer into edit mode:", vol);
    
    setEditingId(vol.UserID);
    
    // We map the SQL Capitalized keys to our lowercase state keys
    setEditData({ 
        fullName: vol.FullName || '', 
        email: vol.Email || '', 
        phone: vol.Phone || '', 
        address: vol.Address || '' 
    });
};

    const handleUpdate = async (id) => {
    // 1. Phone Validation: Numbers only, at least 9-10 digits
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(editData.phone)) {
        return alert("Phone number must contain only numbers!");
    }

    // 2. Email Validation: Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editData.email)) {
        return alert("Please enter a valid email address!");
    }

    try {
        const res = await fetch(`http://127.0.0.1:5000/api/volunteers/${id}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData)
        });

        if (res.ok) {
            alert("Updated successfully! ✅");
            setEditingId(null);
            window.location.reload();
        }
    } catch (err) {
        alert("Update failed.");
    }
};
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
            <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '50px' }} /></Link>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Back</Link>
            </header>

            <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>👥 Manage Active Volunteers</h2>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Full Name</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Phone</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Address</th>
                                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.map((vol) => (
                                <tr key={vol.UserID} style={{ borderBottom: '1px solid #eee' }}>
                                    {editingId === vol.UserID ? (
                                        <>
                                            <td style={{ padding: '10px' }}><input style={{ width: '90%' }} value={editData.fullName} onChange={(e) => setEditData({...editData, fullName: e.target.value})} /></td>
                                            <td style={{ padding: '10px' }}><input style={{ width: '90%' }} value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} /></td>
                                            <td style={{ padding: '10px' }}><input style={{ width: '90%' }} value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} /></td>
                                            <td style={{ padding: '10px' }}><input style={{ width: '90%' }} value={editData.address} onChange={(e) => setEditData({...editData, address: e.target.value})} /></td>
                                            <td style={{ padding: '10px', textAlign: 'center' }}>
                                                <button onClick={() => handleUpdate(vol.UserID)} style={{ backgroundColor: '#438e5e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Save</button>
                                                <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#666', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>X</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td style={{ padding: '15px' }}>{vol.FullName}</td>
                                            <td style={{ padding: '15px' }}>{vol.Email}</td>
                                            <td style={{ padding: '15px' }}>{vol.Phone || '---'}</td>
                                            <td style={{ padding: '15px' }}>{vol.Address || '---'}</td>
                                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                                <button onClick={() => startEdit(vol)} style={{ backgroundColor: '#0000cc', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Edit Profile</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageVolunteers;