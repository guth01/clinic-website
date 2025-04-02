import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Yourprofile.css';

const ProfileContent = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token
        if (!token) throw new Error('No token found!');

        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }, // Send token in request
        });

        setUserData(response.data);
        setFormData({ name: response.data.name, email: response.data.email }); // Form data (exclude ID & Password)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setUserData({ ...userData, name: response.data.name, email: response.data.email }); // Update UI
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <main className="profile-container">
      <h1 className="page-title">Your Profile</h1>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>ID:</label>
          <input type="text" value={userData._id} disabled /> {/* ID is displayed but not editable */}

          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" value="********" disabled /> {/* Password hidden */}

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>ID:</strong> {userData._id}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Password:</strong> ********</p> {/* Password hidden */}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </main>
  );
};

export default ProfileContent;
