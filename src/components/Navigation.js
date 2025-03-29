import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  // Sample services for dropdown - will need backend integration
  const dropdownServices = [
    "General Medicine",
    "Pediatrics",
    "Dermatology",
    "Orthopedics"
  ];

  return (
    <nav className="nav-menu">
  <div className="dropdown">
    <button className="dropbtn">Services</button>
    <div className="dropdown-content">
      {dropdownServices.map((service, index) => (
        <a href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
          {service}
        </a>
      ))}
      <a href="/services" className="view-more">View More</a>
    </div>
  </div>
  <a href="/doctors">Find a Doctor</a>
  <a href="/symptoms">Find a Symptom</a>
  <a href="/book-test">Book a Test</a>
  <a href="/contact">Contact Us</a>
</nav>

  );
};

export default Navigation;