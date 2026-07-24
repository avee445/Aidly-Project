import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../images/logo.png';

const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentUser, setCurrentUser] = useState({ fullName: '', role: 'User' });
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  
  const queryParams = new URLSearchParams(location.search);
  const requestId = queryParams.get('requestId') || '0';
  const partnerName = queryParams.get('partnerName') || 'the other participant';

  useEffect(() => {
    const savedUser = localStorage.getItem('aidlyUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: requestId,
          reviewerName: currentUser.fullName,
          rating: rating,
          comments: comments,
          role: currentUser.role // Sends 'Volunteer' or 'Senior' identification stamp
        })
      });

      if (response.ok) {
        alert("Thank you! Feedback saved successfully. 💚");
        // Redirect back to correct dashboard
        navigate(currentUser.role === 'Volunteer' ? '/volunteer' : '/senior');
      } else {
        alert("Error saving review.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ backgroundColor: '#1e7e48', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <img src={logoImg} alt="Aidly" style={{ height: '50px' }} />
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Welcome {currentUser.fullName}</div>
        <button 
          onClick={() => navigate(currentUser.role === 'Volunteer' ? '/volunteer' : '/senior')} 
          style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}
        >
          ← Back
        </button>
      </header>

      <div style={{ padding: '40px 20px', flex: 1, textAlign: 'center' }}>
        <h1 style={{ color: '#438e5e', fontSize: '40px', margin: '0' }}>Congrats!🎉</h1>
        <p style={{ fontSize: '20px', margin: '20px 0' }}>How was your experience<br/>interacting with {partnerName}?</p>

        {/* Dynamic Star Rating Selector */}
        <div style={{ fontSize: '40px', marginBottom: '30px', cursor: 'pointer' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              onClick={() => setRating(star)} 
              style={{ color: star <= rating ? '#ffcc00' : '#ccc', marginRight: '5px' }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea 
          placeholder="Tell us how it went ...."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', height: '150px', padding: '15px', borderRadius: '15px', border: '1px solid #ccc', fontSize: '16px', marginBottom: '30px', fontFamily: 'inherit' }}
        />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={handleSubmit} style={{ backgroundColor: '#1e7e48', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            ✅ Submit Review
          </button>
          <button 
            onClick={() => navigate(currentUser.role === 'Volunteer' ? '/volunteer' : '/senior')} 
            style={{ backgroundColor: '#ff0000', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>

      <footer style={{ backgroundColor: '#2c3a4f', color: 'white', textAlign: 'center', padding: '15px', fontSize: '12px' }}>
        © 2026 Aidly All Rights Reserved.<br />Developed with love by Ibrahem & Malek.
      </footer>
    </div>
  );
};

export default Survey;