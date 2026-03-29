import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminVolunteers = () => {
  // נתוני דוגמה למתנדבים שממתינים לאישור (לפי הפיגמה)
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Alice Brown", email: "alice.b@example.com" },
    { id: 2, name: "Bob Wilson", email: "bob.w@example.com" },
    { id: 3, name: "Charlie Davis", email: "charlie.d@example.com" },
    { id: 4, name: "Bob Charles", email: "charlie.d@example.com" }
  ]);

  // פונקציות לאישור ודחייה
  const handleApprove = (id, name) => {
    alert(`Approved ${name}!`);
    setVolunteers(volunteers.filter(v => v.id !== id));
  };

  const handleReject = (id, name) => {
    alert(`Rejected ${name}.`);
    setVolunteers(volunteers.filter(v => v.id !== id));
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
              👥 Volunteer Approvals
            </h2>
            {/* אייקון חיפוש סמלי */}
            <span style={{ fontSize: '20px', cursor: 'pointer', color: '#666' }}>🔍</span>
          </div>
          <Link to="/admin" style={{ color: '#0000ee', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Back
          </Link>
        </div>

        {/* --- הטבלה --- */}
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            
            {/* שורת הכותרות (רקע אפרפר) */}
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontSize: '15px', width: '30%' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontSize: '15px', width: '40%' }}>Email</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#333', fontSize: '15px', width: '30%' }}>Action</th>
              </tr>
            </thead>
            
            {/* תוכן הטבלה */}
            <tbody>
              {volunteers.map((vol) => (
                <tr key={vol.id} style={{ borderBottom: '1px solid #eee' }}>
                  
                  {/* עמודת שם */}
                  <td style={{ padding: '15px', textAlign: 'left', fontSize: '15px', color: '#333' }}>
                    {vol.name}
                  </td>
                  
                  {/* עמודת אימייל */}
                  <td style={{ padding: '15px', textAlign: 'left', fontSize: '15px', color: '#555' }}>
                    {vol.email}
                  </td>
                  
                  {/* עמודת כפתורי הפעולה */}
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => handleApprove(vol.id, vol.name)}
                        style={{ 
                          backgroundColor: '#438e5e', /* ירוק */
                          color: 'white', 
                          border: 'none', 
                          padding: '6px 15px', 
                          borderRadius: '20px', 
                          fontWeight: 'bold', 
                          cursor: 'pointer',
                          fontSize: '13px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(vol.id, vol.name)}
                        style={{ 
                          backgroundColor: '#dc3545', /* אדום */
                          color: 'white', 
                          border: 'none', 
                          padding: '6px 15px', 
                          borderRadius: '20px', 
                          fontWeight: 'bold', 
                          cursor: 'pointer',
                          fontSize: '13px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
          {/* מה קורה כשאין מתנדבים לאישור? */}
          {volunteers.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <h3>No pending volunteers! 🎉</h3>
              <p>You are all caught up.</p>
            </div>
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

export default AdminVolunteers;