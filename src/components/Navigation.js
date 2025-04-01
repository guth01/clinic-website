import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="nav-menu">
      <Link to="/pharmacy">Pharmacy</Link>
      <Link to="/doctors">Find a Doctor</Link>
      <Link to="/symptoms">Get Diagnosis</Link>
      <Link to="/book-test">Book an Appointment</Link>

      <div className="dropdown">
        <button className="dropbtn">Additional</button>
        <div className="dropdown-content">
          <Link to="/profile">Your Profile</Link>
          <a href="https://www.rcog.org.uk/for-the-public/a-z-of-medical-terms/">Glossary</a>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;