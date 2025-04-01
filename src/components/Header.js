import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext.js';
import Navigation from './Navigation'; 
import './Header.css';
import logo from '../assets/logo.jpg';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="HART Clinic" className="logo" />
            </Link>
            <div className="brand">
              <h1>HART Clinic</h1>
              <p>Expertise Closer to You.</p>
            </div>
          </div>
          
          <div className="user-section">
            {currentUser ? (
              <div className="user-info">
                <span>Welcome, {currentUser.name}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link">Login</Link>
                <Link to="/signup" className="auth-link signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Use the separate Navigation component */}
      <Navigation />
    </>
  );
};

export default Header;