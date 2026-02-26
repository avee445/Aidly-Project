import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NewRequest from './pages/NewRequest';
import VolunteerDashboard from './pages/VolunteerDashboard';
import SignUp from './pages/SignUp'; 
import AdminVolunteers from './pages/AdminVolunteers'; 
import AdminRequests from './pages/AdminRequests'; 
import ManageVolunteers from './pages/ManageVolunteers'; 
import SeniorDashboard from './pages/SeniorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/admin/volunteers" element={<AdminVolunteers/>} />
        <Route path="/admin/requests" element={<AdminRequests/>} />
        <Route path="/admin/manage-volunteers" element={<ManageVolunteers/>} />
        <Route path="/senior" element={<SeniorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;