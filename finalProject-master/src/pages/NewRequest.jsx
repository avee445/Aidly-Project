import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import './NewRequest.css';

const NewRequest = () => {
  const navigate = useNavigate();
  const { lang } = useOutletContext(); 

  const texts = {
    he: {
      title: "קריאת עזרה חדשה",
      backBtn: "← חזרה ללוח הבקרה",
      subtitle: "מלא טופס זה בעת שיחה עם הקשיש",
      lblName: "שם הקשיש",
      phName: "לדוגמה: משה כהן",
      lblPhone: "מספר טלפון",
      phPhone: "050-9999999",
      lblDesc: "תיאור המשימה",
      phDesc: "במה הם צריכים עזרה...",
      lblUrgency: "רמת דחיפות",
      optLow: "נמוכה (יכול לחכות כמה ימים)",
      optMed: "בינונית (יכול לחכות 2-3 ימים)",
      optHigh: "דחופה (חייב להתבצע תוך יום-יומיים)",
      btnSave: "שמור קריאה",
      btnCancel: "ביטול",
      alertSuccess: "הקריאה נשמרה בהצלחה!"
    },
    en: {
      title: "New Help Request",
      backBtn: "← Back to Dashboard",
      subtitle: "Fill this while on the phone with the senior",
      lblName: "Senior Name",
      phName: "e.g Moshe Cohen",
      lblPhone: "Phone Number",
      phPhone: "050-9999999",
      lblDesc: "Task Description",
      phDesc: "What do they need help with...",
      lblUrgency: "Urgency Level",
      optLow: "Low (Can wait a few days)",
      optMed: "Medium (Can wait 2-3 days)",
      optHigh: "Urgent (Must be done in 1-2 days)",
      btnSave: "Save Request",
      btnCancel: "Cancel",
      alertSuccess: "Request Saved Successfully!"
    }
  };

  const t = texts[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.alertSuccess);
    navigate('/admin'); 
  };

  return (
    <div className="new-request-page">
      <div className="admin-wrapper" style={{ maxWidth: '600px', margin: '40px auto' }}>
        
        {/* כותרת עליונה עם כפתור חזרה */}
        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{t.title}</h2>
          <Link to="/admin">
            <button className="btn-logout" style={{ padding: '8px 15px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>
              {t.backBtn}
            </button>
          </Link>
        </div>

        <div className="form-container" style={{ textAlign: lang === 'he' ? 'right' : 'left' }}>
          <p className="subtitle">{t.subtitle}</p>

          <form className="request-card" onSubmit={handleSubmit}> 
            <div className="input-group">
              <label>{t.lblName}</label>
              <input type="text" placeholder={t.phName} required />
            </div>

            <div className="input-group">
              <label>{t.lblPhone}</label>
              <input 
                type="tel" 
                placeholder={t.phPhone} 
                required 
                style={{ direction: 'ltr', textAlign: lang === 'he' ? 'right' : 'left' }} 
              />
            </div>
            
            <div className="input-group">
              <label>{t.lblDesc}</label>
              <textarea placeholder={t.phDesc} required />
            </div>

            <div className="input-group">
              <label>{t.lblUrgency}</label>
              <select required>
                <option value="Low">{t.optLow}</option>
                <option value="Medium">{t.optMed}</option>
                <option value="High">{t.optHigh}</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="save-btn">{t.btnSave}</button>
              <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>{t.btnCancel}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;