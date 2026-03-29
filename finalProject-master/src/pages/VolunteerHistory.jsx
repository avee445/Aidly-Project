import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const VolunteerHistory = () => {
  const historyData = [
    { id: 1, date: "20/02/2026", senior: "Mrs. Sarah Levi", task: "Tech Support", status: "pending", isPending: true },
    { id: 2, date: "24/02/2026", senior: "Mrs. Sarah Levi", task: "Home Repair", status: "Completed", isPending: false },
    { id: 3, date: "13/02/2026", senior: "Mrs. Sarah Levi", task: "Tech Support", status: "Completed", isPending: false },
    { id: 4, date: "24/02/2026", senior: "Mrs. Sarah Levi", task: "Home Repair", status: "Completed", isPending: false },
    { id: 5, date: "13/02/2026", senior: "Mrs. Sarah Levi", task: "Tech Support", status: "Completed", isPending: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, sans-serif', margin: 0 }}>
      
      {/* Header ירוק רחב */}
      <header style={{ backgroundColor: '#1e7e48', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={logoImg} alt="Aidly" style={{ height: '50px' }} />
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
          Welcome ALEX<br/>SUID
        </div>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Tasks</div>
      </header>

      {/* כותרת הדף */}
      <div style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold', margin: 0 }}>Volunteer History</h1>
        <Link to="/volunteer" style={{ color: '#0000ff', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>← Back</Link>
      </div>

      {/* הטבלה המעוצבת */}
      <div style={{ padding: '0 40px', flex: 1 }}>
        {/* שורת כותרות מעוגלת */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          padding: '15px 0', 
          border: '1px solid #ddd', 
          borderRadius: '40px', 
          marginBottom: '30px',
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '500'
        }}>
          <div>Date</div>
          <div>Who did<br/>I help?</div>
          <div>Task</div>
          <div>Status</div>
        </div>

        {/* שורות הנתונים עם קווים מפרידים */}
        <div>
          {historyData.map((item) => (
            <div key={item.id}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr', 
                textAlign: 'center',
                fontSize: '18px',
                padding: '15px 0',
                alignItems: 'center'
              }}>
                <div>{item.date}</div>
                <div>{item.senior}</div>
                <div>{item.task}</div>
                <div style={{ 
                  color: item.isPending ? '#d9534f' : '#438e5e', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  {item.status} {item.isPending ? '⏳' : '✅'}
                </div>
              </div>
              <hr style={{ border: 'none', borderBottom: '1.5px solid #555', margin: '0 20px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer כהה */}
      <footer style={{ backgroundColor: '#2c3a4f', color: 'white', textAlign: 'center', padding: '20px 0', fontSize: '15px', marginTop: '40px' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default VolunteerHistory;