import React from 'react';
import { useOutletContext } from 'react-router-dom';

const SeniorDashboard = () => {
  // שואבים את השפה מהטמפלייט הראשי
  const { lang } = useOutletContext();

  // המילון של מסך הקשיש
  const texts = {
    he: {
      welcome: "שלום, מר כהן! 👴",
      subtitle: "כאן תוכל לראות את הבקשות שלך ולבקש עזרה חדשה.",
      newRequestBtn: "+ בקש עזרה חדשה עכשיו",
      tableTitle: "היסטוריית הבקשות שלי",
      thDate: "תאריך",
      thTask: "מה הייתי צריך?",
      thStatus: "סטטוס טיפול",
      statusDone: "טופל בהצלחה ✅",
      statusPending: "ממתין למתנדב ⏳"
    },
    en: {
      welcome: "Hello, Mr. Cohen! 👴",
      subtitle: "Here you can view your requests and ask for new help.",
      newRequestBtn: "+ Request New Help Now",
      tableTitle: "My Requests History",
      thDate: "Date",
      thTask: "What did I need?",
      thStatus: "Status",
      statusDone: "Completed ✅",
      statusPending: "Waiting for Volunteer ⏳"
    }
  };

  const t = texts[lang];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
      <h2>{t.welcome}</h2>
      <p>{t.subtitle}</p>

      {/* כפתור אדום בולט לקשישים לבקשת עזרה */}
      <button style={{
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '15px 30px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        margin: '20px 0',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }} onClick={() => alert("במערכת אמיתית זה יפתח טופס בקשה מפושט.")}>
        {t.newRequestBtn}
      </button>

      {/* טבלת היסטוריה - מתיישרת לימין או שמאל לפי השפה */}
      <div style={{ marginTop: '40px', textAlign: lang === 'he' ? 'right' : 'left' }}>
        <h3>{t.tableTitle}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e7e48', color: 'white' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t.thDate}</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t.thTask}</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>{t.thStatus}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>01/03/2026</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>קניית תרופות מבית המרקחת</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', color: 'green', fontWeight: 'bold' }}>{t.statusDone}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>07/03/2026</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>עזרה בתיקון נזילה בכיור</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', color: '#e67e22', fontWeight: 'bold' }}>{t.statusPending}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeniorDashboard;