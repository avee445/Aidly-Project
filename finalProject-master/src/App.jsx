import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ייבוא דפי המערכת
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// דפי מנהל (Admin)
import AdminDashboard from './pages/AdminDashboard';
import AdminRequests from './pages/AdminRequests';
import AdminVolunteers from './pages/AdminVolunteers';
import ManageVolunteers from './pages/ManageVolunteers';
import NewRequest from './pages/NewRequest'; // הקובץ שקיים אצלך

// דפי מתנדב (Volunteer)
import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteerHistory from './pages/VolunteerHistory';

// דפי קשיש (Senior)
import SeniorDashboard from './pages/SeniorDashboard';
import Survey from './pages/Survey';

function App() {
  return (
    <Router>
      <Routes>
        {/* דפי כניסה והרשמה */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* נתיבי מנהל */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/volunteers" element={<AdminVolunteers />} />
        <Route path="/admin/manage-volunteers" element={<ManageVolunteers />} />
        <Route path="/new-request" element={<NewRequest />} />

        {/* נתיבי מתנדב */}
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/volunteer/history" element={<VolunteerHistory />} />

        {/* נתיבי קשיש - שים לב ששניהם משתמשים ב-NewRequest */}
        <Route path="/senior" element={<SeniorDashboard />} />
        <Route path="/senior/new-request" element={<NewRequest />} />
        <Route path="/senior/survey" element={<Survey />} />

        {/* דף שגיאה כללי */}
        <Route path="*" element={<div style={{textAlign: 'center', padding: '50px'}}><h2>404 - Page Not Found</h2><a href="/">Back Home</a></div>} />
      </Routes>
    </Router>
  );
}

export default App;