import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  
  // ניהול מצב (State) להצגת חלונית הסקר
  const [showSurvey, setShowSurvey] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // נתוני דוגמה של המשימה הנוכחית
  const myTask = {
    senior: "Mr. Jones",
    phone: "050-9999999",
    task: "Groceries (Milk, Bread, Eggs)",
    location: "12 Main St, Apt 4",
    urgency: "High"
  };

  // פונקציה שמופעלת כשלוחצים על סיום המשימה
  const handleCompleteClick = () => {
    setShowSurvey(true); // פותח את חלונית הסקר
  };

  // פונקציה שמופעלת כששולחים את הסקר
  const handleSubmitFeedback = () => {
    alert(`תודה רבה על המשוב! הדירוג שלך (${rating} כוכבים) נשמר במערכת.`);
    setShowSurvey(false);
    navigate('/home'); // מחזיר את המתנדב לעמוד הבית אחרי שסיים
  };

  return (
    <div className="admin-wrapper">
      <div className="dashboard-header">
         <h2>אזור אישי - מתנדב 💚</h2>
         <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/home"><button className="btn-logout" style={{ color: '#1e7e48' }}>🏠 עמוד הבית</button></Link>
          <Link to="/"><button className="btn-logout">התנתקות</button></Link>
        </div>
      </div>

      <div className="stats-card">
        <h3>המשימה שלי</h3>
        <hr />
        <div style={{ marginTop: '15px' }}>
          <p><strong>Senior:</strong> {myTask.senior}</p>
          <p><strong>Phone:</strong> {myTask.phone}</p>
          <p><strong>Task:</strong> {myTask.task}</p>
          <p><strong>Address:</strong> {myTask.location}</p>
          <p><strong>Urgency:</strong> <span className="status-tag high">{myTask.urgency}</span></p>
        </div>

        <button 
          className="donebtn" 
          style={{ marginTop: '20px', padding: '15px', width: '100%', fontSize: '16px' }}
          onClick={handleCompleteClick}
        >
          ✅ סימון המשימה כהושלמה
        </button>
      </div>

      {/* החלונית הקופצת (Modal) של הסקר */}
      {showSurvey && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ color: '#1e7e48', marginBottom: '10px' }}>כל הכבוד! 🎉</h2>
            <p>איך הייתה ההתנדבות עם {myTask.senior}?</p>
            
            <div style={{ margin: '20px 0', fontSize: '24px', cursor: 'pointer' }}>
              {/* יצירת 5 כוכבי דירוג */}
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? '#FFD700' : '#ccc', marginRight: '5px' }}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea 
              placeholder="ספר לנו בקצרה איך היה (אופציונלי)..." 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px', resize: 'none' }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="donebtn" style={{ flex: 1, background: '#1e7e48', padding: '10px' }} onClick={handleSubmitFeedback}>
                שליחת משוב וסיום
              </button>
              <button className="donebtn" style={{ flex: 1, background: '#888', padding: '10px' }} onClick={() => setShowSurvey(false)}>
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// עיצוב פנימי (Inline CSS) עבור החלונית הקופצת כדי שלא נצטרך לגעת בקבצי CSS נוספים
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
};

export default VolunteerDashboard;