import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './AdminDashboard.css';

const AdminRequests = () => {
  const { lang } = useOutletContext();

  const texts = {
    he: {
      title: "📋 תור בקשות",
      backBtn: "← חזרה ללוח הבקרה",
      thSeniorTask: "קשיש / משימה",
      thCurrentStatus: "סטטוס נוכחי",
      thAssignVol: "שיבוץ מתנדב",
      thActions: "פעולות",
      waiting: "ממתין",
      assigned: "שובץ:",
      chooseVol: "בחר מתנדב...",
      unassignedDisplay: "טרם שובץ",
      btnSave: "שמור / עדכן",
      btnDone: "סמן כבוצע",
      emptyEmoji: "🎉",
      emptyTitle: "הכל מטופל!",
      emptyDesc: "אין כרגע בקשות עזרה ממתינות.",
      alertNoVol: "אנא בחר מתנדב תחילה.",
      alertNoChange: "לא בוצעו שינויים. מתנדב זה כבר משובץ למשימה זו.",
      alertSuccess: "אישור: פרטי המשימה נשלחו אל ",
      alertCompleted: "המשימה הושלמה והוסרה מהתור הפעיל."
    },
    en: {
      title: "📋 Request Queue",
      backBtn: "← Back to Dashboard",
      thSeniorTask: "Senior / Task",
      thCurrentStatus: "Current Status",
      thAssignVol: "Assign Volunteer",
      thActions: "Actions",
      waiting: "Waiting",
      assigned: "Assigned:",
      chooseVol: "Choose Volunteer...",
      unassignedDisplay: "Unassigned",
      btnSave: "Save / Change",
      btnDone: "Mark Done",
      emptyEmoji: "🎉",
      emptyTitle: "All caught up!",
      emptyDesc: "There are no pending help requests at the moment.",
      alertNoVol: "Please choose a volunteer first.",
      alertNoChange: "No changes were made. This volunteer is already assigned to this task.",
      alertSuccess: "Confirmation: Task details sent to ",
      alertCompleted: "Task completed and removed from the active queue."
    }
  };

  const t = texts[lang];

  // הנתונים עכשיו הם אובייקטים דו-לשוניים!
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      senior: { he: "משה כהן", en: "Mr. Jones" }, 
      task: { he: "קניות בסופר", en: "Groceries" }, 
      urgency: "High", 
      assignedTo: "Unassigned" 
    },
    { 
      id: 2, 
      senior: { he: "שושנה לוי", en: "Mrs. Levy" }, 
      task: { he: "בית מרקחת", en: "Pharmacy" }, 
      urgency: "Medium", 
      assignedTo: "Unassigned" 
    },
    { 
      id: 3, 
      senior: { he: "חיים ישראלי", en: "Mr. Cohen" }, 
      task: { he: "החלפת נורה", en: "Lightbulb Fix" }, 
      urgency: "Low", 
      assignedTo: "Unassigned" 
    }
  ]);

  // גם המתנדבים ברשימה מוגדרים כאובייקטים
  const volunteers = [
    { id: "v1", names: { he: "אליס בראון", en: "Alice Brown" } },
    { id: "v2", names: { he: "בוב וילסון", en: "Bob Wilson" } },
    { id: "v3", names: { he: "צ'ארלי דייויס", en: "Charlie Davis" } }
  ];

  const [selections, setSelections] = useState({});

  const handleSelectionChange = (requestId, volunteerId) => {
    setSelections({ ...selections, [requestId]: volunteerId });
  };

  const saveAssignment = (id) => {
    const selectedVolId = selections[id];
    const currentRequest = requests.find(req => req.id === id);

    if (!selectedVolId || selectedVolId === "Unassigned") {
      alert(t.alertNoVol);
      return;
    }

    if (selectedVolId === currentRequest.assignedTo) {
      alert(t.alertNoChange);
      return;
    }

    setRequests(requests.map(req => 
      req.id === id ? { ...req, assignedTo: selectedVolId } : req
    ));
    
    // מציאת שם המתנדב להודעת הקופצת לפי השפה
    const volName = volunteers.find(v => v.id === selectedVolId).names[lang];
    alert(`${t.alertSuccess}${volName}!`);
  };

  const handleComplete = (requestId) => {
    const updatedList = requests.filter(req => req.id !== requestId);
    setRequests(updatedList);
    alert(t.alertCompleted);
  };

  // פונקציית עזר להצגת שם המתנדב ששובץ
  const getAssignedName = (volId) => {
    if (volId === "Unassigned") return t.waiting;
    const vol = volunteers.find(v => v.id === volId);
    return vol ? `${t.assigned} ${vol.names[lang]}` : t.waiting;
  };

  return (
    <div className="admin-wrapper">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{t.title}</h2>
        <Link to="/admin">
          <button className="btn-logout">{t.backBtn}</button>
        </Link>
      </div>

      <div className="stats-card">
        {requests.length > 0 ? (
          <div className="table-responsive">
            <table style={{ width: '100%', textAlign: lang === 'he' ? 'right' : 'left' }}>
              <thead>
                <tr>
                  <th>{t.thSeniorTask}</th>
                  <th>{t.thCurrentStatus}</th>
                  <th>{t.thAssignVol}</th>
                  <th>{t.thActions}</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      {/* מציג את השם והמשימה לפי השפה הנוכחית! */}
                      <strong>{req.senior[lang]}</strong><br/>
                      <small style={{ color: '#666' }}>{req.task[lang]}</small>
                    </td>
                    <td>
                      <span className={`status-tag ${req.assignedTo === 'Unassigned' ? 'pending' : 'done'}`}>
                        {getAssignedName(req.assignedTo)}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="status-tag"
                        style={{ border: '1px solid #ddd', padding: '5px', cursor: 'pointer' }}
                        onChange={(e) => handleSelectionChange(req.id, e.target.value)}
                        defaultValue={req.assignedTo}
                      >
                        <option value="Unassigned">{t.chooseVol}</option>
                        {volunteers.map(v => (
                          <option key={v.id} value={v.id}>{v.names[lang]}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="donebtn" 
                        style={{ background: '#007bff', padding: '5px 10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
                        onClick={() => saveAssignment(req.id)}
                      >
                        {t.btnSave}
                      </button>
                      <button 
                        className="donebtn" 
                        style={{ background: '#1e7e48', padding: '5px 10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => handleComplete(req.id)}
                      >
                        {t.btnDone}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '50px' }}>{t.emptyEmoji}</h1>
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;