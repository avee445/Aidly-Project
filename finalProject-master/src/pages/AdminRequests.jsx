import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminRequests = () => {
  // נתוני דוגמה לבקשות (כמו בפיגמה)
  const [requests, setRequests] = useState([
    { id: 1, senior: "Mr. Jones", task: "Groceries", status: "WAITING", assignedTo: "" },
    { id: 2, senior: "Mr. Will", task: "Pharmacy", status: "WAITING", assignedTo: "" },
    { id: 3, senior: "Mrs. Lauren", task: "Groceries", status: "WAITING", assignedTo: "" },
    { id: 4, senior: "Mr. Joey", task: "Pharmacy", status: "WAITING", assignedTo: "" }
  ]);

  // רשימת מתנדבים לדוגמה
  const volunteers = ["Alice Brown", "Bob Wilson", "Charlie Davis"];

  const handleSave = (id) => {
    alert(`Task saved and updated successfully!`);
    // כאן בעתיד תוסיף את הלוגיקה לשמירה במסד הנתונים
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
        
        {/* כותרת וכפתור חזור */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
          <h2 style={{ fontSize: '24px', color: '#000', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            📋 Request Queue
          </h2>
          <Link to="/admin" style={{ color: '#0000ee', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Back
          </Link>
        </div>

        {/* --- הטבלה --- */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            
            {/* שורת הכותרות של הטבלה (רקע אפרפר כמו בפיגמה) */}
            <thead>
              <tr style={{ backgroundColor: '#f5f6f8', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left', color: '#333', fontSize: '15px', width: '25%' }}>Senior<br/>/ Task</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#333', fontSize: '15px', width: '20%' }}>Current<br/>Status</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#333', fontSize: '15px', width: '35%' }}>Assign<br/>Volunteer</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#333', fontSize: '15px', width: '20%' }}>Actions</th>
              </tr>
            </thead>
            
            {/* תוכן הטבלה */}
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                  
                  {/* עמודת שם ומשימה */}
                  <td style={{ padding: '15px', textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>{req.senior}</div>
                    <div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>{req.task}</div>
                  </td>
                  
                  {/* עמודת סטטוס (התגית הכתומה) */}
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{ 
                      backgroundColor: '#f5a623', 
                      color: 'white', 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      letterSpacing: '0.5px'
                    }}>
                      {req.status}
                    </span>
                  </td>
                  
                  {/* עמודת בחירת מתנדב */}
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <select style={{ 
                      padding: '8px', 
                      borderRadius: '20px', 
                      border: '1px solid #ccc', 
                      fontSize: '13px', 
                      width: '90%',
                      outline: 'none',
                      color: '#555',
                      cursor: 'pointer'
                    }}>
                      <option value="">VOLUNTEER</option>
                      {volunteers.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </td>
                  
                  {/* עמודת כפתור השמירה (הכחול המעוגל) */}
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleSave(req.id)}
                      style={{ 
                        backgroundColor: '#0000cc', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 20px', 
                        borderRadius: '20px', 
                        fontWeight: 'bold', 
                        cursor: 'pointer',
                        fontSize: '14px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      Save
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
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

export default AdminRequests;