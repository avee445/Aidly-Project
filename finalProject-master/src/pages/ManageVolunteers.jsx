import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Alice Brown", phone: "050-1111111", email: "alice@aidly.com", status: "active" },
    { id: 2, name: "Bob Wilson", phone: "052-2222222", email: "bob@aidly.com", status: "on-break" },
    { id: 3, name: "Charlie Davis", phone: "054-3333333", email: "charlie@aidly.com", status: "inactive" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (vol) => {
    setEditId(vol.id);
    setEditFormData(vol);
  };

  const handleSave = (id) => {
    setVolunteers(volunteers.map(v => v.id === id ? editFormData : v));
    setEditId(null);
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <div className="dashboard-header">
        <h2>👥 Manage Volunteers</h2>
        <Link to="/admin"><button className="btn-logout">← Back</button></Link>
      </div>

      <div className="stats-card">
        <input 
          type="text" 
          placeholder="Search volunteers..." 
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((vol) => (
                <tr key={vol.id}>
                  {editId === vol.id ? (
                    <>
                      <td><input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="edit-input" /></td>
                      <td>{vol.email}</td>
                      <td>
                        <select value={editFormData.status} onChange={(e) => setEditFormData({...editFormData, status: e.target.value})} className="edit-input">
                          <option value="active">Active</option>
                          <option value="on-break">On Break</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td><button className="donebtn" onClick={() => handleSave(vol.id)}>Save</button></td>
                    </>
                  ) : (
                    <>
                      <td>{vol.name}</td>
                      <td>{vol.phone}</td>
                      <td>
                        {/* REUSING YOUR CLASSES: active, on-break, inactive */}
                        <span className={`status-tag ${vol.status}`}>
                          {vol.status.replace("-", " ")}
                        </span>
                      </td>
                      <td>
                        <button className="donebtn" style={{background: '#007bff'}} onClick={() => handleEditClick(vol)}>Edit</button>
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