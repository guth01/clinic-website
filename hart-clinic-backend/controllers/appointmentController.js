import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Fetch Appointments for Logged-in User
export const getAppointments = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Decode JWT to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log('Token decoded:', decoded);
    
    // Find the user by ID to get their email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('Found user, searching for appointments with email:', user.email);
    
    // Fetch appointments using the email
    const appointments = await Appointment.find({ email: user.email });
    console.log(`Found ${appointments.length} appointments for ${user.email}`);

    return res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Cancel Appointment by ID
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Decode JWT to get user ID (not email)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    // First get the user to find their email
    // Changed from require to using the already imported User model
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Now use the user's email to find the appointment
    const appointment = await Appointment.findOne({ _id: id, email: user.email });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or not authorized to delete' });
    }

    await Appointment.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};