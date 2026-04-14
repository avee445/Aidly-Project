import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../images/logo.png';

const NewRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // בדיקה: האם אנחנו בנתיב של הקשיש או של המנהל?
  const isSenior = location.pathname.includes('/senior');
  
  // נתוני דוגמה לקשיש (במציאות זה יגיע מה-Database)
  const [formData, setFormData] = useState({
    seniorName: isSenior ? "Mr. Abraham Cohen" : "",
    phone: isSenior ? "050-1234567" : "",
    address: isSenior ? "12 Main Street, Apt 4, Tel Aviv" : "",
    taskType: "",
    urgency: ""
  });

  const welcomeMessage = isSenior ? "Welcome Mr.\nCohen" : "Welcome Admin\nCohen";
  const backPath = isSenior ? "/senior" : "/admin";

  const handleSave = (e) => {
    e.preventDefault();
    alert("Request saved successfully!");
    navigate(backPath);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Segoe UI, Tahoma, sans-serif', margin: 0 }}>
      
      {/* Header מיושר מחדש: לוגו בשמאל, שם באמצע, כפתור בימין */}
      <header style={{ backgroundColor: '#1e7e48', padding: '10px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        
        {/* לוגו בצד שמאל (לחיץ) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoImg} alt="Aidly" style={{ height: '50px', cursor: 'pointer' }} />
            </Link>
        </div>

        {/* טקסט באמצע */}
        <div style={{ fontWeight: 'bold', textAlign: 'center', whiteSpace: 'pre-line', fontSize: '16px', flex: 1 }}>
          {welcomeMessage}
        </div>

        {/* כפתור חזרה בצד ימין */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={backPath} style={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', lineHeight: '1' }}>←</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Back</div>
            </Link>
        </div>
      </header>

      <div style={{ flex: 1, padding: '40px 20px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', color: '#438e5e', margin: '0 0 10px 0' }}>New Help Request</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            {isSenior ? "We are here to help you, Mr. Cohen" : "Fill this while on the phone with the senior"}
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* שם הקשיש */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Full Name</label>
            <input 
              type="text" 
              value={formData.seniorName}
              onChange={(e) => setFormData({...formData, seniorName: e.target.value})}
              placeholder="e.g Moshe Cohen" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: isSenior ? '#f9f9f9' : 'white' }} 
            />
          </div>

          {/* טלפון */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Phone Number</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="050-9999999" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: isSenior ? '#f9f9f9' : 'white' }} 
            />
          </div>

          {/* כתובת */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Address</label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Street, City, Apt number" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: isSenior ? '#f9f9f9' : 'white' }} 
            />
          </div>

          {/* תיאור משימה */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>What do you need help with?</label>
            <select required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: 'white' }}>
              <option value="">Select a task description</option>
              <option>Grocery Shopping</option>
              <option>Pharmacy / Medicines</option>
              <option>Home Repair (Plumbing/Electric)</option>
              <option>Technical Support (Phone/PC)</option>
              <option>Medical Appointment Escort</option>
            </select>
          </div>

          {/* דחיפות */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Urgency Level</label>
            <select required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: 'white' }}>
              <option value="">Select urgency level</option>
              <option>🔴 High - Immediate (Today)</option>
              <option>🟡 Medium - Next 2-3 days</option>
              <option>🟢 Low - No rush</option>
            </select>
          </div>

          <button 
            type="submit" 
            style={{ backgroundColor: '#438e5e', color: 'white', padding: '15px', borderRadius: '10px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            Send Request 🚀
          </button>

          {isSenior && (
             <button 
             type="button" 
             onClick={() => navigate('/senior')}
             style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
           >
             Cancel
           </button>
          )}
        </form>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: 'white', textAlign: 'center', padding: '15px', fontSize: '12px' }}>
        © 2026 Aidly All Rights Reserved.<br />
        Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default NewRequest;