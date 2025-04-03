import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>HART Clinic</h3>
          <p>Expertise Closer to You.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pharmacy">Pharmacy</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/book-test">Appointments</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>123 Healthcare Avenue, Bangalore, India</p>
          <p>Email: info@hartclinic.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HART Clinic. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;