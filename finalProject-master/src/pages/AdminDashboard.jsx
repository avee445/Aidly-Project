import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const AdminDashboard = () => {
  const { lang } = useOutletContext();

  const texts = {
    he: {
      title: "לוח בקרה למנהל",
      logout: "התנתקות",
      stats: [
        { num: "14", label: "קשישים ממתינים" },
        { num: "6", label: "מתנדבים חדשים" },
        { num: "92%", label: "אחוז הצלחה" }
      ],
      cards: [
        { title: "📋 תור בקשות", desc: "צפייה וניהול של משימות פתוחות מקשישים.", btn: "ניהול בקשות", link: "/admin/requests" },
        { title: "👥 מתנדבים ממתינים", desc: "אישור משתמשים חדשים שממתינים להצטרף.", btn: "צפייה באישורים", link: "/admin/volunteers" },
        { title: "👥 ניהול מתנדבים", desc: "עריכת סטטוס וניהול מתנדבים קיימים ופעילים.", btn: "עריכת מתנדבים", link: "/admin/manage-volunteers" },
        { title: "📞 קריאה חדשה", desc: "הזנה ידנית של בקשת עזרה עבור קשיש.", btn: "+ הוספת בקשה", link: "/admin/new-request" }
      ],
      chartTitle: "📊 פעילות שבועית",
      days: ["ב'", "ג'", "ד'", "ה'", "ו'"],
      tableTitle: "📝 פעילות אחרונה",
      thSenior: "קשיש", thTask: "משימה", thStatus: "סטטוס",
      statusPending: "ממתין", statusDone: "בוצע"
    },
    en: {
      title: "Admin Dashboard",
      logout: "Logout",
      stats: [
        { num: "14", label: "SENIORS WAITING" },
        { num: "6", label: "NEW VOLUNTEERS" },
        { num: "92%", label: "SUCCESS RATE" }
      ],
      cards: [
        { title: "📋 Request Queue", desc: "View and manage open tasks from seniors.", btn: "Manage Requests", link: "/admin/requests" },
        { title: "👥 Pending Volunteers", desc: "Approve new users waiting to join.", btn: "View Approvals", link: "/admin/volunteers" },
        { title: "👥 Manage Volunteers", desc: "Edit status and manage active volunteers in the system.", btn: "Edit Volunteers", link: "/admin/manage-volunteers" },
        { title: "📞 New Call", desc: "Manually record a request for a senior.", btn: "+ Record Request", link: "/admin/new-request" }
      ],
      chartTitle: "📊 Weekly Activity",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      tableTitle: "📝 Recent Activity",
      thSenior: "Senior", thTask: "Task", thStatus: "Status",
      statusPending: "PENDING", statusDone: "DONE"
    }
  };

  const t = texts[lang];

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '30px' }}>
        <h2>{t.title}</h2>
        <Link to="/login" style={{ color: '#5b5fc7', textDecoration: 'none', fontWeight: 'bold' }}>{t.logout}</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {t.stats.map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1e7e48', fontSize: '36px', margin: '0 0 10px 0' }}>{stat.num}</h2>
            <p style={{ color: '#777', fontSize: '12px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {t.cards.map((card, index) => (
          <div key={index} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: '#2c3e50', marginTop: 0, fontSize: '18px' }}>{card.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{card.desc}</p>
            </div>
            <Link to={card.link} style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '12px', backgroundColor: '#1e7e48', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }}>
                {card.btn}
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* הגרף המתוקן! */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>{t.chartTitle}</h3>
          
          <div style={{ height: '220px', display: 'flex', padding: '0 10px', borderBottom: '1px solid #eee', position: 'relative' }}>
            
            {/* מספרי ציר ה-Y */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '30px', color: '#888', fontSize: '12px', paddingRight: lang === 'he' ? '0' : '15px', paddingLeft: lang === 'en' ? '0' : '15px' }}>
              <span>30</span><span>20</span><span>10</span><span>0</span>
            </div>

            {/* עמודות הגרף מיושרות לתחתית */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '30px', height: '100%', boxSizing: 'border-box' }}>
              {[45, 85, 40, 100, 65].map((height, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '40px' }}>
                  {/* העמודה הירוקה עם גובה באחוזים */}
                  <div style={{ width: '100%', height: `${height}%`, backgroundColor: '#a8e6cf', borderRadius: '3px 3px 0 0' }}></div>
                  {/* יום בשבוע */}
                  <span style={{ position: 'absolute', bottom: '-25px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>{t.days[idx]}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* הטבלה תחת הגרף */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>{t.tableTitle}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'he' ? 'right' : 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px 10px', color: '#666' }}>{t.thSenior}</th>
                <th style={{ padding: '15px 10px', color: '#666' }}>{t.thTask}</th>
                <th style={{ padding: '15px 10px', color: '#666' }}>{t.thStatus}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px 10px' }}>Mr. Smith</td>
                <td style={{ padding: '15px 10px' }}>Groceries</td>
                <td style={{ padding: '15px 10px' }}><span style={{ backgroundColor: '#fdf3d8', color: '#d4a32a', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>{t.statusPending}</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px 10px' }}>Mrs. Gale</td>
                <td style={{ padding: '15px 10px' }}>Pharmacy</td>
                <td style={{ padding: '15px 10px' }}><span style={{ backgroundColor: '#e2f5ec', color: '#1e7e48', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>{t.statusDone}</span></td>
              </tr>
              <tr>
                <td style={{ padding: '15px 10px' }}>Mr. Jones</td>
                <td style={{ padding: '15px 10px' }}>Doctor Appt</td>
                <td style={{ padding: '15px 10px' }}><span style={{ backgroundColor: '#fdf3d8', color: '#d4a32a', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>{t.statusPending}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;