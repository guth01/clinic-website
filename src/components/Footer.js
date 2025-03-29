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
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/book-test">Appointments</a></li>
            <li><a href="/contact">Contact Us</a></li>
        </ul>

          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>123 Healthcare Avenue, Bangalore, India</p>
          <p>Email: info@hartclinic.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">📘</a> {/* Facebook */}
            <a href="#" className="social-icon">📷</a> {/* Instagram */}
            <a href="#" className="social-icon">📱</a> {/* Twitter/X */}
            <a href="#" className="social-icon">📹</a> {/* YouTube */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HART Clinic. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;