import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext.js'; // Adjust the path if needed
import './Yourprofile.css';

const ProfileContent = () => {
  const { authToken, currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user profile and appointments data when component mounts
    const fetchData = async () => {
      try {
        if (!authToken) throw new Error('No token found!');

        // Fetch user profile
        const profileResponse = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setUserData(profileResponse.data);
        setFormData({ 
          name: profileResponse.data.name, 
          email: profileResponse.data.email 
        });

        // Fetch user appointments
        console.log('Attempting to fetch appointments...');
        const appointmentResponse = await axios.get(
          'http://localhost:5000/api/user-appointments/appointments',
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log('Appointment response:', appointmentResponse.data);

        setAppointments(appointmentResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Failed to fetch user data: ${err.response ? err.response.data.message : err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      setUserData({ ...userData, name: response.data.name, email: response.data.email });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(`Failed to update profile: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await axios.delete(`http://localhost:5000/api/user-appointments/appointments/${appointmentId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        // Update the appointments list after deletion
        setAppointments(appointments.filter(apt => apt._id !== appointmentId));
        alert('Appointment cancelled successfully!');
      } catch (err) {
        console.error('Error cancelling appointment:', err);
        alert(`Failed to cancel appointment: ${err.response ? err.response.data.message : err.message}`);
      }
    }
  };

  // Helper function to format dates properly
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return "Invalid Date";
      }
      
      // Format date as local date string
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return "Error";
    }
  };

  if (loading) return <div className="profile-container">Loading profile...</div>;
  if (error) return <div className="profile-container">{error}</div>;

  return (
    <div className="profile-container">
      <h1 className="page-title">Your Profile</h1>
      
      {/* Profile Section */}
      <div className="content-card">
        <div className="section-header">
          <h2 className="section-title">Profile Information</h2>
          {!isEditing && (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">ID:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={userData._id} 
                  disabled 
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Name:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleProfileChange} 
                  required 
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Email:</label>
                <input 
                  type="email" 
                  className="form-input" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleProfileChange} 
                  required 
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Password:</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value="********" 
                  disabled 
                />
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-grid">
            <div className="profile-field">
              <div className="field-label">ID:</div>
              <div className="field-value">{userData._id}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">Name:</div>
              <div className="field-value">{userData.name}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">Email:</div>
              <div className="field-value">{userData.email}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">Password:</div>
              <div className="field-value">********</div>
            </div>
          </div>
        )}
      </div>

      {/* Appointments Section */}
      <div className="content-card">
        <h2 className="section-title">Your Appointments</h2>
        
        {appointments.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{formatDate(appointment.preferredDate)}</td>
                    <td>{appointment.preferredTime || "N/A"}</td>
                    <td>{appointment.preferredDepartment || "General"}</td>
                    <td>{appointment.status || "Scheduled"}</td>
                    <td>
                      <button 
                        onClick={() => handleCancelAppointment(appointment._id)}
                        style={{ 
                          backgroundColor: '#e74c3c', 
                          color: 'white',
                          padding: '4px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer' 
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data-message">
            You don't have any appointments yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;