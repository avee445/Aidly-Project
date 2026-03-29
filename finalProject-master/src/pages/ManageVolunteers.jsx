import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const ManageVolunteers = () => {
  // נתוני דוגמה למתנדבים הקיימים (כמו בפיגמה)
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Alice Brown", phone: "050-1111111", email: "alice@aidly.com", status: "active" },
    { id: 2, name: "Bob Wilson", phone: "052-2222222", email: "bob@aidly.com", status: "on break" },
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

  // פונקציה שקובעת את צבע הסטטוס לפי המילה (בדיוק כמו בפיגמה)
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#1e7e48'; // ירוק
      case 'on break': return '#f5a623'; // כתום/צהוב
      case 'inactive': return '#dc3545'; // אדום
      default: return '#333';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0 }}>
      
      {/* --- Header (הסרגל הירוק העליון) --- */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Link to="/">
       <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
      </Link>
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', lineHeight: '1.2' }}>
          Welcome Admin<br/>Cohen
        </div>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }}>
          Logout
        </Link>
      </header>

      {/* --- תוכן מרכזי --- */}
      <div style={{ flex: 1, padding: '30px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* כותרת, חיפוש וכפתור חזור */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h2 style={{ fontSize: '24px', color: '#000', margin: 0, fontWeight: 'bold' }}>
              👥 Manage Volunteers
            </h2>
            <span style={{ fontSize: '20px', color: '#666' }}>🔍</span>
          </div>
          <Link to="/admin" style={{ color: '#0000ee', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Back
          </Link>
        </div>

        {/* תיבת החיפוש שכבר כתבת */}
        <input 
          type="text" 
          placeholder="Search volunteers by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}
        />

        {/* --- הטבלה --- */}
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontSize: '15px' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontSize: '15px' }}>Contact</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#333', fontSize: '15px' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#333', fontSize: '15px' }}>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {filteredVolunteers.map((vol) => (
                <tr key={vol.id} style={{ borderBottom: '1px solid #eee' }}>
                  
                  {/* מצב עריכה */}
                  {editId === vol.id ? (
                    <>
                      <td style={{ padding: '10px' }}>
                        <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} style={{ padding: '8px', width: '90%', borderRadius: '5px', border: '1px solid #1e7e48', outline: 'none' }} />
                      </td>
                      <td style={{ padding: '10px' }}>
                        <input type="text" value={editFormData.phone} onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})} style={{ padding: '8px', width: '90%', borderRadius: '5px', border: '1px solid #1e7e48', outline: 'none' }} />
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <select value={editFormData.status} onChange={(e) => setEditFormData({...editFormData, status: e.target.value})} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1e7e48', outline: 'none' }}>
                          <option value="active">active</option>
                          <option value="on break">on break</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button onClick={() => handleSave(vol.id)} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                      </td>
                    </>
                  ) : (
                    /* מצב תצוגה רגיל */
                    <>
                      <td style={{ padding: '15px', color: '#333', fontSize: '15px' }}>{vol.name}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '15px' }}>{vol.phone}</td>
                      <td style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: getStatusColor(vol.status) }}>
                        {vol.status}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleEditClick(vol)}
                          style={{ backgroundColor: '#0000cc', color: 'white', border: 'none', padding: '6px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredVolunteers.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No volunteers found.</div>
          )}
        </div>

      </div>

      {/* --- Footer הקבוע --- */}
      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px', lineHeight: '1.6', width: '100%' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default ManageVolunteers;