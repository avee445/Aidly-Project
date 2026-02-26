import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">Aidly</div>
        <Link to="/"><button className="login-nav-btn">Login</button></Link>
      </nav>

      <header className="hero-section">
        <h1>Connecting Seniors with Local Heroes</h1>
        <p>A community-driven platform to ensure our elders never feel alone or helpless.</p>
        
        <div className="hero-actions">
          <Link to="/SignUp" className="hero-card volunteer">
            <h3>I want to Volunteer</h3>
            <p>Offer your time for groceries, repairs, or just a chat.</p>
            <span>Get Started →</span>
          </Link>
          
          <Link to="/senior" className="hero-card senior" style={{ textDecoration: 'none' }}>
           <h3>I Need Help</h3>
           <p>Request assistance for daily tasks and medical needs.</p>
           <span>לאזור האישי →</span>
          </Link>
        </div>
      </header>

      <section className="features-grid">
        <div className="feature">
          <h4>Safe & Vetted</h4>
          <p>Every volunteer undergoes a manual background check by our admins.</p>
        </div>
        <div className="feature">
          <h4>Fast Response</h4>
          <p>Our priority-based system ensures urgent needs are met first.</p>
        </div>
        <div className="feature">
          <h4>Community Led</h4>
          <p>Built for neighbors, by neighbors.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;