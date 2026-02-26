import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminRequests = () => {
  // 1. We put the data into 'useState' so React can update the screen when data changes
  const [requests, setRequests] = useState([
    { id: 1, senior: "Mr. Jones", task: "Groceries", urgency: "High", assignedTo: "Unassigned" },
    { id: 2, senior: "Mrs. Levy", task: "Pharmacy", urgency: "Medium", assignedTo: "Unassigned" },
    { id: 3, senior: "Mr. Cohen", task: "Lightbulb Fix", urgency: "Low", assignedTo: "Unassigned" }
  ]);

  // 2. This state tracks what is selected in the dropdown BEFORE we hit save
  const [selections, setSelections] = useState({});

  const volunteers = ["Alice Brown", "Bob Wilson", "Charlie Davis"];

  const handleSelectionChange = (requestId, volunteerName) => {
    setSelections({
      ...selections,
      [requestId]: volunteerName
    });
  };

  // 3. ACTION: Save the assignment and simulate an email
 const saveAssignment = (id) => {
    // 1. Get the volunteer name currently selected in the dropdown
    const selectedName = selections[id];
    
    // 2. Find the specific request in your data to see who is ALREADY assigned
    const currentRequest = requests.find(req => req.id === id);

    // 3. Logic Check: If no selection was made or it's still 'Unassigned'
    if (!selectedName || selectedName === "Unassigned") {
      alert("Please choose a volunteer first.");
      return;
    }

    // 4. THE FIX: Check if the new selection is the same as the current one
    if (selectedName === currentRequest.assignedTo) {
      alert("No changes were made. This volunteer is already assigned to this task.");
      return;
    }

    // 5. If it's a new person, update the state
    setRequests(requests.map(req => 
      req.id === id ? { ...req, assignedTo: selectedName } : req
    ));
    
    alert(`Confirmation: Task details sent to ${selectedName}!`);
  };

  // 4. ACTION: Complete the task (This makes it disappear from the list)
  const handleComplete = (requestId) => {
    // We filter the list to keep only the items that WERE NOT clicked
    const updatedList = requests.filter(req => req.id !== requestId);
    setRequests(updatedList);
    alert("Task completed and removed from the active queue.");
  };

  return (
    <div className="admin-wrapper">
      <div className="dashboard-header">
        <h2>📋 Request Queue</h2>
        <Link to="/admin">
          <button className="btn-logout">← Back to Dashboard</button>
        </Link>
      </div>

      <div className="stats-card">
        {requests.length > 0 ? (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Senior / Task</th>
                  <th>Current Status</th>
                  <th>Assign Volunteer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <strong>{req.senior}</strong><br/>
                      <small style={{ color: '#666' }}>{req.task}</small>
                    </td>
                    <td>
                      <span className={`status-tag ${req.assignedTo === 'Unassigned' ? 'pending' : 'done'}`}>
                        {req.assignedTo === 'Unassigned' ? 'Waiting' : `Assigned: ${req.assignedTo}`}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="status-tag"
                        style={{ border: '1px solid #ddd', padding: '5px', cursor: 'pointer' }}
                        onChange={(e) => handleSelectionChange(req.id, e.target.value)}
                        defaultValue="Unassigned"
                      >
                        <option value="Unassigned">Choose Volunteer...</option>
                        {volunteers.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="donebtn" 
                        style={{ background: '#007bff' }} 
                        onClick={() => saveAssignment(req.id)}
                      >
                        Save / Change
                      </button>
                      <button 
                        className="donebtn" 
                        style={{ background: '#1e7e48' }}
                        onClick={() => handleComplete(req.id)}
                      >
                        Mark Done
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* 5. EMPTY STATE: Show this when no tasks are left */
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '50px' }}>🎉</h1>
            <h3>All caught up!</h3>
            <p>There are no pending help requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;