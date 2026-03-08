import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './AdminDashboard.css';

const ManageVolunteers = () => {
  const { lang } = useOutletContext();

  const texts = {
    he: {
      title: "👥 ניהול מתנדבים",
      backBtn: "← חזרה",
      searchPlaceholder: "חפש מתנדבים לפי שם...",
      thName: "שם",
      thContact: "פרטי קשר",
      thStatus: "סטטוס",
      thActions: "פעולות",
      optActive: "פעיל",
      optOnBreak: "בהפסקה",
      optInactive: "לא פעיל",
      btnSave: "שמור",
      btnEdit: "ערוך"
    },
    en: {
      title: "👥 Manage Volunteers",
      backBtn: "← Back",
      searchPlaceholder: "Search volunteers...",
      thName: "Name",
      thContact: "Contact",
      thStatus: "Status",
      thActions: "Actions",
      optActive: "Active",
      optOnBreak: "On Break",
      optInactive: "Inactive",
      btnSave: "Save",
      btnEdit: "Edit"
    }
  };

  const t = texts[lang];

  const getStatusText = (statusVal) => {
    if (statusVal === 'active') return t.optActive;
    if (statusVal === 'on-break') return t.optOnBreak;
    if (statusVal === 'inactive') return t.optInactive;
    return statusVal;
  };

  // הנתונים כאובייקט דו לשוני
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: { he: "אליס בראון", en: "Alice Brown" }, phone: "050-1111111", email: "alice@aidly.com", status: "active" },
    { id: 2, name: { he: "בוב וילסון", en: "Bob Wilson" }, phone: "052-2222222", email: "bob@aidly.com", status: "on-break" },
    { id: 3, name: { he: "צ'ארלי דייויס", en: "Charlie Davis" }, phone: "054-3333333", email: "charlie@aidly.com", status: "inactive" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (vol) => {
    setEditId(vol.id);
    // מעתיקים את המתנדב כדי לערוך אותו
    setEditFormData(vol);
  };

  const handleSave = (id) => {
    setVolunteers(volunteers.map(v => v.id === id ? editFormData : v));
    setEditId(null);
  };

  // סינון חכם שבודק את השם לפי השפה שבה המשתמש צופה כרגע
  const filteredVolunteers = volunteers.filter(v => 
    v.name[lang].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{t.title}</h2>
        <Link to="/admin"><button className="btn-logout">{t.backBtn}</button></Link>
      </div>

      <div className="stats-card">
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '100%', maxWidth: '300px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <div className="table-responsive">
          <table style={{ width: '100%', textAlign: lang === 'he' ? 'right' : 'left' }}>
            <thead>
              <tr>
                <th>{t.thName}</th>
                <th>{t.thContact}</th>
                <th>{t.thStatus}</th>
                <th>{t.thActions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((vol) => (
                <tr key={vol.id}>
                  {editId === vol.id ? (
                    <>
                      <td>
                        {/* עדכון חכם של השם רק בשפה שפתוחה עכשיו */}
                        <input 
                          type="text" 
                          value={editFormData.name[lang]} 
                          onChange={(e) => setEditFormData({
                            ...editFormData, 
                            name: { ...editFormData.name, [lang]: e.target.value }
                          })} 
                          className="edit-input" 
                          style={{ padding: '5px' }}
                        />
                      </td>
                      <td style={{ direction: 'ltr', textAlign: lang === 'he' ? 'right' : 'left' }}>{vol.phone}</td>
                      <td>
                        <select 
                          value={editFormData.status} 
                          onChange={(e) => setEditFormData({...editFormData, status: e.target.value})} 
                          className="edit-input"
                          style={{ padding: '5px' }}
                        >
                          <option value="active">{t.optActive}</option>
                          <option value="on-break">{t.optOnBreak}</option>
                          <option value="inactive">{t.optInactive}</option>
                        </select>
                      </td>
                      <td>
                        <button className="donebtn" style={{ background: '#28a745', padding: '5px 10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleSave(vol.id)}>
                          {t.btnSave}
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* מציג את השם לפי השפה */}
                      <td>{vol.name[lang]}</td>
                      <td style={{ direction: 'ltr', textAlign: lang === 'he' ? 'right' : 'left' }}>{vol.phone}</td>
                      <td>
                        <span className={`status-tag ${vol.status}`}>
                          {getStatusText(vol.status)}
                        </span>
                      </td>
                      <td>
                        <button className="donebtn" style={{ background: '#007bff', padding: '5px 10px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleEditClick(vol)}>
                          {t.btnEdit}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageVolunteers;