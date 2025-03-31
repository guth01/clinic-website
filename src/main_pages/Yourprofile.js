import React, { useState } from 'react';
import './Yourprofile.css';

const ProfileContent = () => {
  // Mock user data - this would come from your backend
  const [userData, setUserData] = useState({
    name: 'Neymar',
    email: 'neymar@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1992-02-05',
    address: '123 Health Street, Medical City, MC 12345'
  });

  // State for form editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});

  // Mock appointment data - this would be fetched from your backend
  const appointments = [
    { id: 1, date: '2025-04-10', time: '10:30 AM', doctor: 'Dr. Sarah Johnson', department: 'General Medicine', status: 'Confirmed' },
    { id: 2, date: '2025-04-22', time: '2:15 PM', doctor: 'Dr. Michael Chen', department: 'Dermatology', status: 'Pending' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({...formData});
    setIsEditing(false);
    // Here you would send the updated data to your backend
    alert('Profile updated successfully!');
  };

  return (
    <main className="profile-container">
      <h1 className="page-title">Your Profile</h1>
      
      {/* Welcome Text */}
      <div className="content-card">
        <h2 className="section-title">Welcome to Your Personal Health Hub</h2>
        <p className="welcome-text">
          Your profile is the central place to manage your healthcare journey with HART Clinic. 
          Here you can view and update your personal information, track your appointments, 
          and review your pharmacy order history. We believe in putting you in control of your 
          healthcare experience, making it as seamless and transparent as possible.
        </p>
      </div>

      {/* User Details Section */}
      <section className="content-card">
        <div className="section-header">
          <h2 className="section-title">Personal Information</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field full-width">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({...userData});
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-grid">
            <div className="profile-field">
              <p className="field-label">Full Name</p>
              <p className="field-value">{userData.name}</p>
            </div>
            <div className="profile-field">
              <p className="field-label">Email</p>
              <p className="field-value">{userData.email}</p>
            </div>
            <div className="profile-field">
              <p className="field-label">Phone</p>
              <p className="field-value">{userData.phone}</p>
            </div>
            <div className="profile-field">
              <p className="field-label">Date of Birth</p>
              <p className="field-value">{userData.dateOfBirth}</p>
            </div>
            <div className="profile-field full-width">
              <p className="field-label">Address</p>
              <p className="field-value">{userData.address}</p>
            </div>
          </div>
        )}
      </section>

      {/* Appointments Section */}
      <section className="content-card">
        <h2 className="section-title">Your Appointments</h2>
        {appointments.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <span className={`status-badge ${
                        appointment.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <a href="#" className="action-link">CANCEL</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data-message">You have no upcoming appointments.</p>
        )}
        <div className="action-container">
          <button className="primary-btn">
            Book New Appointment
          </button>
        </div>
        {/* API integration placeholder */}
        <div className="api-placeholder">
          {/* <!-- Appointments will be fetched from backend API --> */}
        </div>
      </section>
    </main>
  );
};

export default ProfileContent;