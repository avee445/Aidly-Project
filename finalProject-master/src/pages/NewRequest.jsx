import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewRequest.css';

const NewRequest = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request Saved Successfully!");
    navigate('/admin'); 
  };

  return (
    <div className="new-request-page">
      <div className="admin-wrapper">
        <div className="form-container">
          <h2>New Help Request</h2>
          <p className="subtitle">Fill this while on the phone with the senior</p>

          <form className="request-card" onSubmit={handleSubmit}> 
            <div className="input-group">
              <label>Senior Name</label>
              <input type="text" placeholder="e.g Moshe Cohen" required />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="050-9999999" required />
            </div>
            
            <div className="input-group">
              <label>Task Description</label>
              <textarea placeholder="What do they need help with..." required />
            </div>

            <div className="input-group">
              <label>Urgency Level</label>
              <select required>
                <option value="Low">Low (Can wait a few days)</option>
                <option value="Medium">Medium (Can wait 2-3 days)</option>
                <option value="High">Urgent (Must be done in 1-2 days)</option>
              </select>
            </div>
            
            <button type="submit" className="save-btn">Save Request</button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;