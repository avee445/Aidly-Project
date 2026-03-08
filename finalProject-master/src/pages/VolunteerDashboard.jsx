import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const VolunteerDashboard = () => {
  const { lang } = useOutletContext(); // שואבים את השפה

  // ניהול המצב של חלונית המשוב הקופצת (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');

  // המילון הדו-לשוני למסך המתנדב
  const texts = {
    he: {
      title: "אזור אישי - מתנדב",
      welcome: "שלום, ישראל ישראלי! 🦸‍♂️",
      taskTitle: "המשימה הנוכחית שלי:",
      taskDesc: "קניית תרופות ומשלוח עד הדלת",
      seniorName: "עבור: מר כהן (קשיש)",
      address: "כתובת: רחוב הרצל 15, תל אביב",
      phone: "טלפון: 050-1234567",
      doneBtn: "סימון המשימה כהושלמה ✅",
      modalTitle: "כל הכבוד! איך הייתה ההתנדבות?",
      ratingLabel: "דירוג חוויית ההתנדבות:",
      notesLabel: "הערות (אופציונלי):",
      submitFeedbackBtn: "שליחת משוב וסיום",
      cancelBtn: "ביטול",
      successMsg: "תודה רבה! המשוב נשמר והמשימה נסגרה."
    },
    en: {
      title: "Volunteer Dashboard",
      welcome: "Hello, Israel Israeli! 🦸‍♂️",
      taskTitle: "My Current Task:",
      taskDesc: "Buying medicine and delivering to the door",
      seniorName: "For: Mr. Cohen (Senior)",
      address: "Address: 15 Herzl St, Tel Aviv",
      phone: "Phone: 050-1234567",
      doneBtn: "Mark Task as Done ✅",
      modalTitle: "Great job! How was the volunteering?",
      ratingLabel: "Rate the volunteering experience:",
      notesLabel: "Notes (Optional):",
      submitFeedbackBtn: "Submit Feedback & Finish",
      cancelBtn: "Cancel",
      successMsg: "Thank you! Feedback saved and task closed."
    }
  };

  const t = texts[lang];

  // מה קורה כששולחים את המשוב
  const handleFeedbackSubmit = () => {
    alert(t.successMsg);
    setIsModalOpen(false); // סוגר את החלונית
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>{t.title}</h2>
      <h3 style={{ textAlign: 'center', color: '#1e7e48' }}>{t.welcome}</h3>

      {/* כרטיס המשימה הנוכחית */}
      <div style={{
        backgroundColor: 'white', padding: '20px', borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '30px',
        borderTop: '5px solid #1e7e48'
      }}>
        <h4 style={{ margin: '0 0 15px 0' }}>{t.taskTitle}</h4>
        <p><strong>{t.taskDesc}</strong></p>
        <p>{t.seniorName}</p>
        <p>{t.address}</p>
        <p>{t.phone}</p>

        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'block', width: '100%', padding: '15px', marginTop: '20px',
            backgroundColor: '#1e7e48', color: 'white', fontSize: '18px', fontWeight: 'bold',
            border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}
        >
          {t.doneBtn}
        </button>
      </div>

      {/* חלונית המשוב (Modal) - מופיעה רק אם isModalOpen שווה true */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '400px'
          }}>
            <h3 style={{ marginTop: 0 }}>{t.modalTitle}</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{t.ratingLabel}</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: '100%', padding: '10px' }}>
                <option value="5">⭐⭐⭐⭐⭐ מצוין</option>
                <option value="4">⭐⭐⭐⭐ טוב מאוד</option>
                <option value="3">⭐⭐⭐ בסדר</option>
                <option value="2">⭐⭐ טעון שיפור</option>
                <option value="1">⭐ גרוע</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{t.notesLabel}</label>
              <textarea 
                rows="3" value={notes} onChange={(e) => setNotes(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleFeedbackSubmit} style={{ flex: 1, padding: '10px', backgroundColor: '#1e7e48', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {t.submitFeedbackBtn}
              </button>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {t.cancelBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;