import Appointment from '../models/Appointment.js';
import jwt from 'jsonwebtoken';

// Fetch Appointments for Logged-in User
export const getAppointments = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Decode JWT to get user email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // Fetch appointments for this user
    const appointments = await Appointment.find({ email: userEmail });

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // Find appointment and verify ownership
    const appointment = await Appointment.findOne({ _id: id, email: userEmail });

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
