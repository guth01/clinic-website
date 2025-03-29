import React, { useState } from 'react';
import './AppointmentBookingPage.css';

const AppointmentBookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    reasonForAppointment: 'General Checkup',
    preferredDepartment: '',
    preferredDoctor: '',
    existingConditions: '',
    currentMedications: '',
    allergies: '',
    insuranceDetails: ''
  });

  // Mock data for departments and doctors
  const departments = [
    'General Medicine',
    'ENT',
    'Dermatology',
    'Pediatrics',
    'Cardiology',
    'Orthopedics'
  ];

  const doctors = {
    'General Medicine': ['Dr. Rajesh Kumar', 'Dr. Anita Sharma' , 'Dr. Vikram Singh' , 'Dr. Priya Patel'],
    'ENT': ['Dr. Suresh Menon', 'Dr. Deepika Malhotra' , 'Dr. Ramesh Joshi' , 'Dr. Kavita Reddy'],
    'Dermatology': ['Dr. Sanjay Khanna', 'Dr. Meera Iyer' , 'Dr. Arjun Nair' , 'Dr. Sunita Agarwal'],
    'Pediatrics': ['Dr. Rahul Mehta', 'Dr. Lakshmi Rao' , 'Dr. Vivek Gupta' , 'Dr. Neha Verma'],
    'Cardiology': ['Dr. Amit Bansal', 'Dr. Sarita Mishra' , 'Dr. Nitin Choudhary' , 'Dr. Pooja Sharma'],
    'Orthopedics': ['', '']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // When department changes, reset the doctor selection
    if (name === 'preferredDepartment') {
      setFormData(prevState => ({
        ...prevState,
        preferredDoctor: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    alert('Appointment request submitted successfully!');
    
    // Reset form after submission
    setFormData({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      contactNumber: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
      reasonForAppointment: 'General Checkup',
      preferredDepartment: '',
      preferredDoctor: '',
      existingConditions: '',
      currentMedications: '',
      allergies: '',
      insuranceDetails: ''
    });
  };

  return (
    <div className="appointment-page">
      <div className="page-content">
        <h1>Book an Appointment</h1>
        <p className="intro-text">
          Fill out the form below to request an appointment at HART Clinic. Our team will review your request and confirm your appointment as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name <span className="required">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth <span className="required">*</span></label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender <span className="required">*</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Appointment Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredTime">Preferred Time <span className="required">*</span></label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="evening">Evening (6:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reasonForAppointment">Reason for Appointment <span className="required">*</span></label>
              <select
                id="reasonForAppointment"
                name="reasonForAppointment"
                value={formData.reasonForAppointment}
                onChange={handleChange}
                required
              >
                <option value="General Checkup">General Checkup</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDepartment">Preferred Department <span className="required">*</span></label>
                <select
                  id="preferredDepartment"
                  name="preferredDepartment"
                  value={formData.preferredDepartment}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferredDoctor">Available Doctors</label>
                <select
                  id="preferredDoctor"
                  name="preferredDoctor"
                  value={formData.preferredDoctor}
                  onChange={handleChange}
                  disabled={!formData.preferredDepartment}
                >
                  <option value="">Select Doctor</option>
                  {formData.preferredDepartment && 
                    doctors[formData.preferredDepartment].map(doctor => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Medical Information</h2>
            
            <div className="form-group">
              <label htmlFor="existingConditions">Existing Medical Conditions</label>
              <textarea
                id="existingConditions"
                name="existingConditions"
                value={formData.existingConditions}
                onChange={handleChange}
                placeholder="Please list any existing medical conditions"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentMedications">Current Medications</label>
              <textarea
                id="currentMedications"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                placeholder="Please list any medications you are currently taking"
              />
            </div>

            <div className="form-group">
              <label htmlFor="allergies">Allergies (if any)</label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Please list any allergies you have"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Insurance Information</h2>
            
            <div className="form-group">
              <label htmlFor="insuranceDetails">Insurance Details (if applicable)</label>
              <textarea
                id="insuranceDetails"
                name="insuranceDetails"
                value={formData.insuranceDetails}
                onChange={handleChange}
                placeholder="Please provide your insurance provider and policy number"
              />
            </div>
          </div>

          <div className="terms-policy">
            <p>
              By submitting this form, you agree to our <a href="#">Terms of Service</a> and acknowledge our <a href="#">Privacy Policy</a>.
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">Book Appointment</button>
            <button type="reset" className="secondary-button">Reset Form</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;