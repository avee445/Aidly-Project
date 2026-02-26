import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-wrapper">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <Link to="/"><button className="btn-logout">Logout</button></Link>
      </div>

      {/* NEW: DASHBOARD SUMMARY CARDS */}
      <div className="quick-stats-row">
        <div className="stat-item">
          <span className="stat-number">14</span>
          <span className="stat-label">Seniors Waiting</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">6</span>
          <span className="stat-label">New Volunteers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">92%</span>
          <span className="stat-label">Success Rate</span>
        </div>
      </div>

      <div className="admin-menu-grid">
        <div className="admin-card">
          <h3>📋 Request Queue</h3>
          <p>View and manage open tasks from seniors.</p>
          <Link to="/admin/requests"><button className="action-btn">Manage Requests</button></Link>
          <div className="admin-card">
          <h3>👥 Manage Volunteers</h3>
          <p>עריכת סטטוס וניהול מתנדבים קיימים ופעילים.</p>
          <Link to="/admin/manage-volunteers"><button className="action-btn">Edit Volunteers</button></Link>
        </div>
        </div>
        <div className="admin-card">
          <h3>👥 Pending Volunteers</h3>
          <p>Approve new users waiting to join.</p>
          <Link to="/admin/volunteers"><button className="action-btn">View Approvals</button></Link>
        </div>
        <div className="admin-card">
          <h3>📞 New Call</h3>
          <p>Manually record a request for a senior.</p>
          <Link to="/new-request"><button className="action-btn">+ Record Request</button></Link>
        </div>
      </div>

      <div className="analysis-container">
        <div className="stats-card">
          <h3>📊 Weekly Activity</h3>
          <div className="chart-wrapper">
            <div className="y-axis">
              <span>30</span><span>20</span><span>10</span><span>0</span>
            </div>
            <div className="bar-chart">
              <div className="bar-box"><div className="bar" style={{ height: '40%' }}></div><span>Mon</span></div>
              <div className="bar-box"><div className="bar" style={{ height: '70%' }}></div><span>Tue</span></div>
              <div className="bar-box"><div className="bar" style={{ height: '35%' }}></div><span>Wed</span></div>
              <div className="bar-box"><div className="bar" style={{ height: '85%' }}></div><span>Thu</span></div>
              <div className="bar-box"><div className="bar" style={{ height: '55%' }}></div><span>Fri</span></div>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3>📝 Recent Activity</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>Senior</th><th>Task</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Mr. Smith</td><td>Groceries</td><td><span className="status-tag pending">Pending</span></td></tr>
                <tr><td>Mrs. Gale</td><td>Pharmacy</td><td><span className="status-tag done">Done</span></td></tr>
                <tr><td>Mr. Jones</td><td>Doctor Appt</td><td><span className="status-tag pending">Pending</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;