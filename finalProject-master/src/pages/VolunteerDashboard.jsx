import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  const currentTask = {
    senior: "Mr. Jones",
    phone: "050-9999999",
    task: "Groceries (Milk, Bread, Eggs)",
    address: "12 Main St, Apt 4",
    urgency: "High"
  };

  const handleDone = () => {
    // מעבר לדף הסקר לאחר סיום המשימה
    navigate('/senior/survey');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, sans-serif', margin: 0 }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <Link to="/">
             <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
             </Link>
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>
          Welcome ALEX<br/>SUID
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/volunteer/history" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>History</Link>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Logout</Link>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '22px', margin: 0 }}>Volunteer Dashboard 💚</h2>
            <Link to="/home" style={{ color: '#0000ee', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
        </div>

        {/* משימה נוכחית */}
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #eee', paddingBottom: '10px', fontSize: '18px', color: '#1e7e48' }}>My Current Task :</h3>
          
          <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
            <div><strong>Senior:</strong> {currentTask.senior}</div>
            <div><strong>Phone:</strong> {currentTask.phone}</div>
            <div><strong>Task:</strong> {currentTask.task}</div>
            <div><strong>Address:</strong> {currentTask.address}</div>
            <div><strong>Urgency:</strong> <span style={{ color: 'red' }}>🔴 High - Today</span></div>
          </div>

          <button 
            onClick={handleDone}
            style={{ backgroundColor: '#438e5e', color: 'white', border: 'none', width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}
          >
            Mark Task as Done ✅
          </button>
        </div>

        {/* רשימת המשימות שלי */}
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>My Tasks</h3>
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>📋</span>
            <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <strong>Task: Grocery Shopping</strong><br/>
                Senior: Mr. Abraham Cohen<br/>
                Phone: 📞 050-123-4567<br/>
                Address: 12 Main Street, Apt 4<br/>
                Urgency: <span style={{ color: 'red' }}>🔴 High</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={handleDone} style={{ flex: 1, backgroundColor: '#438e5e', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>✅ Done</button>
            <button style={{ flex: 1, backgroundColor: '#ff0000', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: '#a0abc0', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
        <div>© 2026 Aidly All Rights Reserved.</div>
        <div style={{ marginTop: '5px', fontSize: '12px' }}>Developed with love by Ibrahem & Malek.</div>
      </footer>
    </div>
  );
};

export default VolunteerDashboard;