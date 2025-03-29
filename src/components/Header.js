import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation.js';
import './Header.css';

const Header = () => {
  // State for logged-in user - will need backend integration
  const [loggedInUser, setLoggedInUser] = useState({
    name: "John Doe", // This will come from authentication system
    isLoggedIn: true // This will be determined by authentication
  });

  // State for user dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function for logout - will need backend integration
  const handleLogout = () => {
    // Will need to connect to authentication service
    console.log("Logout clicked");
    setLoggedInUser({ name: "", isLoggedIn: false });
    // Backend API call would go here to invalidate session
  };

  return (
    <>
      {/* Header Bar */}
      <header className="header">
        <div className="logo">
          <h1>HART Clinic</h1>
          <p>Expertise Closer to You.</p>
        </div>
        <div className="account-section">
          {loggedInUser.isLoggedIn ? (
            <div className="user-account">
              <div className="user-info" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <i className="user-icon">👤</i>
                <span>{loggedInUser.name}</span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="login-section">
              {/* Login/Register buttons - will link to auth pages */}
                <a href="/login" className="login-btn">Login</a>
                <a href="/register" className="register-btn">Register</a>

            </div>
          )}
        </div>
      </header>
      
      {/* Navigation Menu */}
      <Navigation />
    </>
  );
};

export default Header;