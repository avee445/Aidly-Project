import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. ייבוא הטמפלייט המשותף (שנמצא בתיקיית pages)
import Layout from './pages/Layout';

// 2. ייבוא כל מסכי המערכת
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequests from './pages/AdminRequests';
import AdminVolunteers from './pages/AdminVolunteers';
import ManageVolunteers from './pages/ManageVolunteers';
import NewRequest from './pages/NewRequest';
import VolunteerDashboard from './pages/VolunteerDashboard';
import SeniorDashboard from './pages/SeniorDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        
        {/* Route האב - הטמפלייט שעוטף את כל שאר המסכים */}
        <Route path="/" element={<Layout />}>
          
          {/* מסלולים כלליים */}
          <Route index element={<LandingPage />} /> {/* זה עמוד הבית שיוצג כברירת מחדל */}
          <Route path="home" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          
          {/* אזורים אישיים לפי סוג משתמש */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="volunteer" element={<VolunteerDashboard />} />
          <Route path="senior" element={<SeniorDashboard />} />
          
          {/* תת-מסכים של מנהל */}
          <Route path="admin/requests" element={<AdminRequests />} />
          <Route path="admin/volunteers" element={<AdminVolunteers />} />
          <Route path="admin/manage-volunteers" element={<ManageVolunteers />} />
          <Route path="admin/new-request" element={<NewRequest />} />

        </Route>

      </Routes>
    </Router>
  );
};

export default App;