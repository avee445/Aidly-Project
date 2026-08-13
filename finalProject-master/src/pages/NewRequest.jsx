import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

const NewRequest = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: '', role: '' });
  const [formData, setFormData] = useState({
    seniorName: '', phone: '', address: '', taskDescription: '', urgency: '', customTask: '', sideNotes: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        
        // Auto-fill senior phone and address from signup database record
        setFormData(prev => ({ 
          ...prev, 
          seniorName: user.fullName || '',
          phone: user.phone || '',
          address: user.address || ''
        }));
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
        return alert("Error: The phone number should only contain digits.");
    }

    const finalTaskDescription = formData.taskDescription === 'Other' 
        ? formData.customTask 
        : formData.taskDescription;

    try {
        const response = await fetch('https://aidly-3wxx.onrender.com/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                taskDescription: finalTaskDescription
            })
        });

        if (response.ok) {
            alert("Request sent successfully! 🚀");
            navigate(currentUser.role === 'Admin' ? '/admin' : '/senior');
        }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/"><img src={logoImg} alt="Aidly" style={{ height: '70px' }} /></Link>
        <div style={{ fontWeight: 'bold' }}>Welcome {currentUser.role}<br/>{currentUser.fullName}</div>
        <Link to={currentUser.role === 'Admin' ? "/admin" : "/senior"} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
      </header>

      <div style={{ flex: 1, padding: '40px 20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '32px', color: '#438e5e', textAlign: 'center' }}>New Help Request</h2>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input placeholder="Full Name" required value={formData.seniorName} onChange={(e) => setFormData({...formData, seniorName: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input placeholder="Address" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          
          <select required value={formData.taskDescription} onChange={(e) => setFormData({...formData, taskDescription: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option value="">Select a task</option>
            <option>Grocery Shopping</option>
            <option>Pharmacy / Medicines</option>
            <option>Home Repair</option>
            <option>Technical Support</option>
            <option value="tech2">Technical Sup2port</option>
            <option value="Other">Other...</option>
          </select>

          {formData.taskDescription === 'Other' && (
            <input 
              placeholder="Please describe your need" 
              required 
              value={formData.customTask} 
              onChange={(e) => setFormData({...formData, customTask: e.target.value})} 
              style={{ padding: '12px', borderRadius: '8px', border: '2px solid #438e5e' }} 
            />
          )}
          
         
          <select required value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option value="">Select urgency</option>
            <option>🔴 High - Immediate</option>
            <option>🟡 Medium - 2-3 days</option>
            <option>🟢 Low - No rush</option>
          </select>

          <textarea 
            placeholder="Add side notes / additional details (e.g. gate code, phone before knock, extra item lists)..." 
            value={formData.sideNotes} 
            onChange={(e) => setFormData({...formData, sideNotes: e.target.value})} 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', height: '100px', resize: 'none', fontFamily: 'inherit' }} 
          />

          <button type="submit" style={{ backgroundColor: '#438e5e', color: 'white', padding: '15px', borderRadius: '10px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
            Send Request 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;