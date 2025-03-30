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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data for departments and doctors
  const departments = [
    'General Medicine', 'ENT', 'Dermatology', 'Pediatrics', 'Cardiology', 'Orthopedics'
  ];

  const doctors = {
    'General Medicine': ['Dr. Rajesh Kumar', 'Dr. Anita Sharma', 'Dr. Vikram Singh', 'Dr. Priya Patel'],
    'ENT': ['Dr. Suresh Menon', 'Dr. Deepika Malhotra', 'Dr. Ramesh Joshi', 'Dr. Kavita Reddy'],
    'Dermatology': ['Dr. Sanjay Khanna', 'Dr. Meera Iyer', 'Dr. Arjun Nair', 'Dr. Sunita Agarwal'],
    'Pediatrics': ['Dr. Rahul Mehta', 'Dr. Lakshmi Rao', 'Dr. Vivek Gupta', 'Dr. Neha Verma'],
    'Cardiology': ['Dr. Amit Bansal', 'Dr. Sarita Mishra', 'Dr. Nitin Choudhary', 'Dr. Pooja Sharma'],
    'Orthopedics': ['Dr. Manish Saxena', 'Dr. Anjali Deshmukh']
  };

  // Convert gender value to match the schema enum
  const formatGenderValue = (value) => {
    const genderMap = {
      'male': 'Male',
      'female': 'Female',
      'other': 'Other',
      'prefer-not-to-say': 'Prefer not to say'
    };
    return genderMap[value] || value;
  };

  // Convert preferredTime value to match the schema enum
  const formatTimeValue = (value) => {
    const timeMap = {
      'morning': 'Morning (9:00 AM - 12:00 PM)',
      'afternoon': 'Afternoon (1:00 PM - 5:00 PM)',
      'evening': 'Evening (6:00 PM - 8:00 PM)'
    };
    return timeMap[value] || value;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate contact number (10-15 digits)
    if (!/^\d{10,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10-15 digits';
    }
    
    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear error for this field when the user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    if (name === 'preferredDepartment') {
      setFormData(prevState => ({
        ...prevState,
        preferredDoctor: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    // Format the data to match the schema
    const formattedData = {
      ...formData,
      gender: formatGenderValue(formData.gender),
      preferredTime: formatTimeValue(formData.preferredTime)
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
  
      const data = await response.json();
      console.log('Server response:', data);
  
      if (response.ok) {
        setMessage('Appointment request submitted successfully!');
        // Reset form
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
      } else {
        setMessage(data.message || 'Server error. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="appointment-page">
      <div className="page-content">
        <h1>Book an Appointment</h1>
        <p className="intro-text">
          Fill out the form below to request an appointment at HART Clinic.
        </p>

        {message && <p className={message.includes('success') ? 'message success' : 'message error'}>{message}</p>}

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name <span className="required">*</span></label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth <span className="required">*</span></label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender <span className="required">*</span></label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
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
                {errors.contactNumber && <p className="error-text">{errors.contactNumber}</p>}
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
                {errors.email && <p className="error-text">{errors.email}</p>}
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
                <option value="Follow-up">Follow-up</option>
                <option value="Consultation">Consultation</option>
                <option value="Specialist Referral">Specialist Referral</option>
                <option value="Urgent Care">Urgent Care</option>
              </select>
            </div>

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
              <label htmlFor="preferredDoctor">Preferred Doctor</label>
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

          <div className="form-section">
            <h2>Medical Information</h2>
            
            <div className="form-group">
              <label htmlFor="existingConditions">Existing Medical Conditions</label>
              <textarea 
                id="existingConditions" 
                name="existingConditions" 
                value={formData.existingConditions} 
                onChange={handleChange} 
                placeholder="List any existing medical conditions"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentMedications">Current Medications</label>
              <textarea 
                id="currentMedications" 
                name="currentMedications" 
                value={formData.currentMedications} 
                onChange={handleChange} 
                placeholder="List any medications you are currently taking"
              />
            </div>

            <div className="form-group">
              <label htmlFor="allergies">Allergies</label>
              <textarea 
                id="allergies" 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                placeholder="List any allergies you have"
              />
            </div>

            <div className="form-group">
              <label htmlFor="insuranceDetails">Insurance Details</label>
              <textarea 
                id="insuranceDetails" 
                name="insuranceDetails" 
                value={formData.insuranceDetails} 
                onChange={handleChange} 
                placeholder="Provide your insurance information"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;