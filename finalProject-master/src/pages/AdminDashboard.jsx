import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: 'Admin', role: '' });
  const [stats, setStats] = useState({ pending: 0, ongoing: 0, completed: 0, volunteers: 0 });
  const [adminStats, setAdminStats] = useState({ chartValues: [0, 0, 0, 0, 0] });
  const [activeTab, setActiveTab] = useState('overview');
  const [ratings, setRatings] = useState([]);
  const [loadingRatings, setLoadingRatings] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(savedUser);
    if (user.role !== 'Admin') {
      alert('Access Denied: This area is for Admins only.');
      navigate('/login');
      return;
    }

    setCurrentUser(user);

    fetch('http://127.0.0.1:5000/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));

    fetch('http://127.0.0.1:5000/api/admin-stats')
      .then((res) => res.json())
      .then((data) => setAdminStats(data))
      .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    if (activeTab !== 'ratings') return;

    const fetchRatings = async () => {
      setLoadingRatings(true);
      try {
        const res = await fetch('http://127.0.0.1:5000/api/feedback');
        const data = await res.json();
        setRatings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setRatings([]);
      } finally {
        setLoadingRatings(false);
      }
    };

    fetchRatings();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('aidlyUser');
    navigate('/login');
  };

  const averageRating = ratings.length
    ? (ratings.reduce((sum, item) => sum + Number(item.rating || 0), 0) / ratings.length).toFixed(1)
    : '0.0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <img src={logoImg} alt="Aidly" style={{ height: '70px', cursor: 'pointer' }} />
        </Link>
        <div style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', lineHeight: '1.2' }}>
          Welcome {currentUser.role}<br />{currentUser.fullName}
        </div>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <nav style={{ backgroundColor: '#2c3a4f', padding: '12px 30px', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => setActiveTab('overview')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'overview' ? '#1e7e48' : 'transparent', border: 'none', color: activeTab === 'overview' ? 'white' : '#aedec5', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', borderRadius: '8px', padding: '6px 10px' }}>
          📊 Dashboard
        </button>
        <Link to="/admin/requests" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>
          📋 Request Queue
        </Link>
        <Link to="/admin/volunteers" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', textDecoration: 'none', fontSize: '15px' }}>
          👥 Pending Approvals
        </Link>
        <Link to="/new-request" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', textDecoration: 'none', fontSize: '15px' }}>
          📞 Record Request
        </Link>
        <Link to="/admin/manage-volunteers" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', textDecoration: 'none', fontSize: '15px' }}>
          ⚙️ Manage Users
        </Link>
        <button type="button" onClick={() => setActiveTab('ratings')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === 'ratings' ? '#1e7e48' : 'transparent', border: 'none', color: activeTab === 'ratings' ? 'white' : '#aedec5', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', borderRadius: '8px', padding: '6px 10px' }}>
          ⭐ Ratings
        </button>
      </nav>

      <div style={{ flex: 1, padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {activeTab === 'overview' ? (
          <>
            <h2 style={{ fontSize: '28px', color: '#000', marginBottom: '25px', fontWeight: 'bold' }}>System Overview</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '40px' }}>
              <div style={{ border: '2px solid #d9534f', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#fffcfc' }}>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#d9534f' }}>{stats.pending}</span>
                <span style={{ fontSize: '14px', color: '#d9534f', fontWeight: 'bold' }}>Pending Requests</span>
              </div>
              <div style={{ border: '2px solid #f0ad4e', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#fffdf9' }}>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#f0ad4e' }}>{stats.ongoing}</span>
                <span style={{ fontSize: '14px', color: '#f0ad4e', fontWeight: 'bold' }}>Ongoing Requests</span>
              </div>
              <div style={{ border: '2px solid #1e7e48', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#f4fff8' }}>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#1e7e48' }}>{stats.completed}</span>
                <span style={{ fontSize: '14px', color: '#1e7e48', fontWeight: 'bold' }}>Requests Completed</span>
              </div>
              <div style={{ border: '2px solid #333', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: '#ffffff' }}>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{stats.volunteers}</span>
                <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Total Volunteers</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '16px', color: '#333', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📊 Weekly Activity
              </h3>

              <div style={{ display: 'flex', height: '180px', alignItems: 'flex-end', borderBottom: '2px solid #ccc' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', color: '#888', fontSize: '12px', paddingRight: '15px', borderRight: '1px solid #ccc', textAlign: 'right' }}>
                  <span>{Math.max(...adminStats.chartValues, 5)}</span>
                  <span>{Math.round(Math.max(...adminStats.chartValues, 5) / 2)}</span>
                  <span>0</span>
                </div>

                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', height: '100%' }}>
                  {adminStats.chartValues.map((val, i) => {
                    const maxDataPoint = Math.max(...adminStats.chartValues, 5);
                    const barHeight = (val / maxDataPoint) * 100;
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '40px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e7e48', marginBottom: '5px' }}>{val}</span>
                        <div style={{ width: '100%', height: `${barHeight}%`, backgroundColor: '#aedec5', borderRadius: '4px 4px 0 0' }}></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', marginLeft: '45px', paddingTop: '10px' }}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
                  {adminStats.chartValues.map((_, i) => (
                    <span key={i} style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', width: '40px', textAlign: 'center' }}>
                      Day {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#000', margin: '0 0 6px 0', fontWeight: 'bold' }}>Volunteer Ratings</h2>
                <p style={{ margin: 0, color: '#666' }}>Review feedback submitted after completed requests.</p>
              </div>
              <div style={{ backgroundColor: '#fff8e1', border: '1px solid #f0c36d', padding: '10px 14px', borderRadius: '10px', fontWeight: 'bold', color: '#8a6500' }}>
                Avg Rating: {averageRating}/5
              </div>
            </div>

            {loadingRatings ? (
              <p style={{ color: '#666' }}>Loading ratings...</p>
            ) : ratings.length === 0 ? (
              <p style={{ color: '#666' }}>No ratings available yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {ratings.map((item) => (
                  <div key={item.feedbackId || `${item.requestId}-${item.volunteerName}`} style={{ border: '1px solid #e7e7e7', borderRadius: '12px', padding: '14px', backgroundColor: '#fcfcfc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '15px' }}>{item.volunteerName || 'Volunteer'}</strong>
                      <span style={{ color: '#ffb400', fontWeight: 'bold' }}>
                        {'★'.repeat(Number(item.rating || 0))}
                        {'☆'.repeat(5 - Number(item.rating || 0))}
                        {' '}({item.rating || 0}/5)
                      </span>
                    </div>
                    <p style={{ margin: '8px 0', color: '#555' }}>{item.comments || 'No comments provided.'}</p>
                    <div style={{ fontSize: '13px', color: '#666', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <span>Request ID: {item.requestId}</span>
                      <span>Submitted by: {item.creatorRole || 'Unknown'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;