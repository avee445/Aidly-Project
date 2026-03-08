import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './AdminDashboard.css';

const AdminVolunteers = () => {
  const { lang } = useOutletContext();

  const texts = {
    he: {
      title: "✅ אישור מתנדבים ממתינים",
      backBtn: "← חזרה ללוח הבקרה",
      subtitle: "מתנדבים חדשים שנרשמו וממתינים לאישור מנהל.",
      thName: "שם מלא",
      thCity: "עיר מגורים",
      thPhone: "טלפון",
      thActions: "פעולות",
      approveBtn: "אישור",
      rejectBtn: "דחייה",
      emptyMsg: "אין כרגע מתנדבים שממתינים לאישור."
    },
    en: {
      title: "✅ Approve Pending Volunteers",
      backBtn: "← Back to Dashboard",
      subtitle: "New volunteers who registered and are waiting for approval.",
      thName: "Full Name",
      thCity: "City",
      thPhone: "Phone",
      thActions: "Actions",
      approveBtn: "Approve",
      rejectBtn: "Reject",
      emptyMsg: "There are currently no volunteers waiting for approval."
    }
  };

  const t = texts[lang];

  // נתונים דו-לשוניים
  const [pending, setPending] = useState([
    { id: 1, name: { he: "אלי כהן", en: "Eli Cohen" }, city: { he: "חיפה", en: "Haifa" }, phone: "050-9876543" },
    { id: 2, name: { he: "שירה לוי", en: "Shira Levy" }, city: { he: "תל אביב", en: "Tel Aviv" }, phone: "052-1234567" }
  ]);

  const handleAction = (id, actionType) => {
    setPending(pending.filter(vol => vol.id !== id));
  };

  return (
    <div className="admin-wrapper" style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* כותרת עליונה עם כפתור חזרה */}
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{t.title}</h2>
        <Link to="/admin">
          <button className="btn-logout" style={{ padding: '8px 15px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>
            {t.backBtn}
          </button>
        </Link>
      </div>

      <p style={{ color: '#555' }}>{t.subtitle}</p>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '20px', overflowX: 'auto' }}>
        {pending.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#1e7e48', fontWeight: 'bold' }}>{t.emptyMsg}</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'he' ? 'right' : 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>{t.thName}</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>{t.thCity}</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>{t.thPhone}</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>{t.thActions}</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((vol) => (
                <tr key={vol.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{vol.name[lang]}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{vol.city[lang]}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', direction: 'ltr', textAlign: lang === 'he' ? 'right' : 'left' }}>{vol.phone}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleAction(vol.id, 'approve')}
                        style={{ padding: '8px 15px', backgroundColor: '#1e7e48', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {t.approveBtn}
                      </button>
                      <button 
                        onClick={() => handleAction(vol.id, 'reject')}
                        style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {t.rejectBtn}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminVolunteers;