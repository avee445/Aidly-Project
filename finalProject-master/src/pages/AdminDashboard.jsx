import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png'; 

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0 }}>
      
      {/* --- Header (הסרגל הירוק העליון עם הברכה למנהל) --- */}
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
      <div style={{ flex: 1, padding: '30px 20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        
        <h2 style={{ fontSize: '28px', color: '#000', marginBottom: '25px', fontWeight: 'bold' }}>Admin Dashboard</h2>

        {/* --- 1. קופסאות הסטטיסטיקה (נשארות למעלה) --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '35px' }}>
          <div style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#1e7e48' }}>14</span>
            <span style={{ fontSize: '18px', color: '#1e7e48', fontWeight: 'bold' }}>Seniors Waiting</span>
          </div>
          <div style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#1e7e48' }}>6</span>
            <span style={{ fontSize: '18px', color: '#1e7e48', fontWeight: 'bold' }}>New Volunteers</span>
          </div>
          <div style={{ border: '2px solid #333', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
            <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>92%</span>
            <span style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>Success Rate</span>
          </div>
        </div>

        {/* --- 2. כרטיסיות הניווט / פעולות מנהל (הזזנו אותן למעלה) --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          
          <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>📋 Request Queue</h3>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>View and manage open tasks from seniors.</p>
            <Link to="/admin/requests" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Manage Requests</Link>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>👥 Pending Volunteers</h3>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>Approve new users waiting to join.</p>
            <Link to="/admin/volunteers" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>View Approvals</Link>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>📞 New Call</h3>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>Manually record a request for a senior.</p>
            <Link to="/new-request" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>+ Record Request</Link>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>👥 Manage Volunteers</h3>
            <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>Edit statuses and manage active volunteers.</p>
            <Link to="/admin/manage-volunteers" style={{ display: 'block', backgroundColor: '#438e5e', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Edit Volunteers</Link>
          </div>

        </div>

        {/* --- 3. תרשים הנתונים השבועי (עכשיו הוא בסוף!) --- */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', color: '#333', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Weekly Activity
          </h3>
          
          <div style={{ display: 'flex', height: '160px', alignItems: 'flex-end', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
            
            {/* ציר Y */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', color: '#888', fontSize: '12px', paddingRight: '15px', borderRight: '1px solid #ddd' }}>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
            </div>
            
            {/* העמודות */}
            <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1, height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '35px', height: '40%', backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontWeight: 'bold' }}>Mon</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '35px', height: '80%', backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontWeight: 'bold' }}>Tue</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '35px', height: '35%', backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontWeight: 'bold' }}>Wed</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '35px', height: '95%', backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontWeight: 'bold' }}>Thu</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '35px', height: '60%', backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '11px', color: '#666', marginTop: '8px', fontWeight: 'bold' }}>Fri</span>
              </div>

            </div>
          </div>
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

export default AdminDashboard;