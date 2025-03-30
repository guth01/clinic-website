import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => {
  return (
    <nav className="nav-menu">
      <a href="/pharmacy">Pharmacy</a>
      <a href="/doctors">Find a Doctor</a>
      <a href="/symptoms">Get Diagnosis</a>
      <a href="/book-test">Book an Appointment</a>

      <div className="dropdown">
        <button className="dropbtn">Additional</button>
        <div className="dropdown-content">
          <a href="/profile">Your Profile</a>
          <a href="https://www.rcog.org.uk/for-the-public/a-z-of-medical-terms/">Glossary</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
