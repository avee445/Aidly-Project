import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="split-screen-container">
      <div className="left-pane">
        <div className="signcard">
          <h2>Create Account</h2>
          <form className="signup-form">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
            
            <label>Email</label>
            <input type="email" placeholder="name@example.com" required />
            
            <label>Password</label>
            <input type="password" placeholder="********" required />
            
            <label>Confirm Password</label>
            <input type="password" placeholder="********" required />
            
            <button type="submit" className="action-btn">Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/">Log In</Link></p>
        </div>
      </div>
      <div className="right-pane">
        <img className="signupimg" src="/src/images/signupa.png" alt="Aidly Volunteer" />
      </div>
    </div>
  );
};

export default SignUp;