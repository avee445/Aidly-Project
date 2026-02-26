import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // אנחנו משתמשים בעיצוב הקיים כדי לחסוך זמן ולשמור על אחידות

const SeniorDashboard = () => {
  // נתוני דוגמה (Mock Data) של בקשות העזרה שהקשיש כבר פתח
  const [myRequests, setMyRequests] = useState([
    { id: 1, task: "קניות בסופר (חלב, לחם, ביצים)", status: "done", volunteer: "Alice Brown", date: "20/02/2026" },
    { id: 2, task: "איסוף תרופות מבית המרקחת", status: "pending", volunteer: "מחפש מתנדב...", date: "24/02/2026" }
  ]);

  // פונקציה שמדמה פתיחת קריאה חדשה
  const handleNewRequest = () => {
    alert("הבקשה שלך התקבלה בהצלחה! המנהל שלנו יאשר אותה וימצא לך מתנדב בקרוב.");
  };

  return (
    <div className="admin-wrapper">
     <div className="dashboard-header">
        <h2>אזור אישי - קשיש 👴👵</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/home"><button className="btn-logout" style={{ color: '#1e7e48' }}>🏠 עמוד הבית</button></Link>
          <Link to="/"><button className="btn-logout">התנתקות</button></Link>
        </div>
      </div>

      <div className="stats-card">
        <h3>שלום, משה כהן</h3>
        <p>כאן תוכל לראות את הבקשות שלך או לבקש עזרה חדשה בלחיצת כפתור.</p>
        
        <button 
          className="action-btn" 
          onClick={handleNewRequest} 
          style={{ width: 'auto', padding: '10px 20px', marginBottom: '20px' }}
        >
          + בקש עזרה חדשה עכשיו
        </button>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>מה ביקשתי?</th>
                <th>סטטוס</th>
                <th>מתנדב מטפל</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.date}</td>
                  <td>{req.task}</td>
                  <td>
                    {/* צבע התגית משתנה לפי הסטטוס */}
                    <span className={`status-tag ${req.status}`}>
                      {req.status === 'pending' ? 'ממתין למתנדב' : 'טופל בהצלחה'}
                    </span>
                  </td>
                  <td>{req.volunteer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeniorDashboard;