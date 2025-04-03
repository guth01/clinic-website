import React, { useState } from 'react';
import './HomePage.css';
import pico from '../assets/indian_doctors.jpg';
import priya from '../assets/Priya Patel.jpg';
import nithin from '../assets/Nithin Choudhary.jpg';
import arjun from '../assets/Arjun Nair.png';
import vivek from '../assets/Vivek Gupta.jpg';
import ClinicAnalytics from './ClinicAnalytics';

const HomePage = () => {
  const services = [
    { id: 1, name: "General Medicine", description: "Comprehensive healthcare for adults including diagnosis and treatment of various diseases and preventive care." },
    { id: 2, name: "ENT", description: "Specialized care for ear, nose, throat, and related structures of the head and neck." },
    { id: 3, name: "Dermatology", description: "Diagnosis and treatment of skin, hair, and nail conditions using the latest techniques and medications." },
    { id: 4, name: "Pediatrics", description: "Complete healthcare for infants, children, and adolescents, focusing on growth, development, and disease prevention." },
    { id: 5, name: "Physiotherapy", description: "Rehabilitative treatments to improve mobility, strength, and function through specialized techniques and exercises." },
    { id: 6, name: "Dentistry", description: "Comprehensive dental care including preventive, restorative, and cosmetic procedures for all ages." },
    { 
      id: 7, 
      name: "Gynecology", 
      description: "Women's healthcare services, including reproductive health, prenatal care, and treatment for gynecological conditions." 
    },
    { 
      id: 8, 
      name: "Mental Health & Counseling", 
      description: "Providing psychological support, therapy, and counseling for individuals dealing with stress, anxiety, depression, and other mental health concerns." 
    }
  ];

  // Sample doctor data with image references
  const doctors = [
    { id: 1, name: "Dr. Priya Patel", specialization: "General Medicine", experience: "10+ years", details: "MBBS, MD from AIIMS Delhi. Specializes in chronic disease management.", image: priya },
    { id: 2, name: "Dr. Vivek Gupta", specialization: "Pediatrics", experience: "12+ years", details: "MBBS, DCH from KEM Hospital. Expert in newborn care and childhood diseases.", image: vivek },
    { id: 3, name: "Dr. Arjun Nair", specialization: "Dermatology", experience: "13+ years", details: "MBBS, MD (Dermatology) from PGIMER. Specializes in cosmetic dermatology.", image: arjun },
    { id: 4, name: "Dr. Nithin Choudhary", specialization: "Dentistry", experience: "21+ years", details: "BDS, MD from CMC Vellore. Expert in root canal.", image: nithin }
  ];

  // Sample accreditations - will need backend integration
  const accreditations = [
    { id: 1, name: "NABH", description: "National Accreditation Board for Hospitals & Healthcare Providers" },
    { id: 2, name: "JCI", description: "Joint Commission International" },
    { id: 3, name: "ISO 9001", description: "Quality Management System" }
  ];

  // State for expanded service
  const [expandedService, setExpandedService] = useState(null);

  return (
    <div className="home-page">
      <section className="clinic-intro">
        <div className="intro-text">
          <h2>Welcome to HART Clinic</h2>
          <p>At HART Clinic, we combine cutting-edge medical technology with compassionate care to provide exceptional healthcare services. Our team of experienced healthcare professionals is committed to improving the health and wellbeing of our community by delivering personalized treatment plans in a comfortable and welcoming environment.</p>
        </div>
        <div className="intro-image">
          <div className="banner-image-container">
            <img src={pico} alt="HART Clinic Doctors" className="banner-image" />
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map(service => (
            <div 
              key={service.id} 
              className={`service-card ${expandedService === service.id ? 'expanded' : ''}`}
              onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
            >
              <h3>{service.name}</h3>
              {expandedService === service.id && (
                <p className="service-description">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <ClinicAnalytics />

      <section className="doctors-section">
        <h2>Our Doctors</h2>
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-image-placeholder">
                <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              </div>
              <h3>{doctor.name}</h3>
              <p className="specialization">{doctor.specialization}</p>
              <p className="experience">{doctor.experience}</p>
              <p className="details">{doctor.details}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="accreditations-section">
        <h2>Our Accreditations</h2>
        <div className="accreditations-list">
          {accreditations.map(accreditation => (
            <div key={accreditation.id} className="accreditation-item">
              <h3>{accreditation.name}</h3>
              <p>{accreditation.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;