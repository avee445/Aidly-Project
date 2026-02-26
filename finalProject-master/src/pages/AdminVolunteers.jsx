import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Alice Brown", email: "alice.b@example.com", phone: "050-1234567" },
    { id: 2, name: "Bob Wilson", email: "bob.w@example.com", phone: "052-7654321" },
    { id: 3, name: "Charlie Davis", email: "charlie.d@example.com", phone: "054-9988776" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAction = (id, name, action) => {
    alert(`${action === 'approve' ? 'Approved' : 'Rejected'} ${name}`);
    setVolunteers(volunteers.filter(v => v.id !== id));
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <div className="dashboard-header">
        <h2>👥 Volunteer Approvals</h2>
        <Link to="/admin"><button className="btn-logout">← Back</button></Link>
      </div>

      <div className="stats-card" style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by name..." 
          style={{marginBottom: '20px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', width: '100%'}}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((vol) => (
                <tr key={vol.id}>
                  <td>{vol.name}</td>
                  <td>{vol.email}</td>
                  <td style={{display: 'flex', gap: '10px'}}>
                    <button className="donebtn" style={{background: '#1e7e48'}} onClick={() => handleAction(vol.id, vol.name, 'approve')}>Approve</button>
                    <button className="donebtn" style={{background: '#dc3545'}} onClick={() => handleAction(vol.id, vol.name, 'reject')}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVolunteers;