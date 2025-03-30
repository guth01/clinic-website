import express from 'express';
import Appointment from '../models/Appointment.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Incoming request data:', req.body); // Log request data

    const {
      fullName, dateOfBirth, gender, contactNumber, email,
      preferredDate, preferredTime, reasonForAppointment,
      preferredDepartment, preferredDoctor, existingConditions,
      currentMedications, allergies, insuranceDetails,
    } = req.body;

    if (!fullName || !dateOfBirth || !gender || !contactNumber || !email || !preferredDate || !preferredTime || !reasonForAppointment || !preferredDepartment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const appointment = new Appointment({
      fullName, dateOfBirth, gender, contactNumber, email,
      preferredDate, preferredTime, reasonForAppointment,
      preferredDepartment, preferredDoctor, existingConditions,
      currentMedications, allergies, insuranceDetails, createdAt: new Date(),
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });

  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

  
  // Get all appointments for the current user
  router.get('/', async (req, res) => {
    try {
      let appointments;
      
      // If user is a patient, get their appointments
      if (req.user.role === 'patient') {
        appointments = await Appointment.find({ patient: req.user._id })
          .populate('doctor', 'name')
          .sort({ date: 1, time: 1 });
      } 
      // If user is a doctor, get appointments where they're the doctor
      else if (req.user.role === 'doctor') {
        appointments = await Appointment.find({ doctor: req.user._id })
          .populate('patient', 'name')
          .sort({ date: 1, time: 1 });
      }
      // If admin, get all appointments
      else if (req.user.role === 'admin') {
        appointments = await Appointment.find({})
          .populate('patient', 'name')
          .populate('doctor', 'name')
          .sort({ date: 1, time: 1 });
      }
      
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  // Get a specific appointment
  router.get('/:id', auth, async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id)
        .populate('patient', 'name email')
        .populate('doctor', 'name');
      
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      
      // Check if user has permission to view this appointment
      const isAuthorized = 
        req.user.role === 'admin' ||
        appointment.patient._id.toString() === req.user._id.toString() ||
        appointment.doctor._id.toString() === req.user._id.toString();
      
      if (!isAuthorized) {
        return res.status(403).json({ message: 'Not authorized to view this appointment' });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  // Update an appointment
  router.put('/:id', auth, async (req, res) => {
    try {
      const { date, time, status, notes } = req.body;
      const appointment = await Appointment.findById(req.params.id);
      
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      
      // Check if user has permission to update this appointment
      const isAuthorized = 
        req.user.role === 'admin' ||
        appointment.patient.toString() === req.user._id.toString() ||
        (req.user.role === 'doctor' && appointment.doctor.toString() === req.user._id.toString());
      
      if (!isAuthorized) {
        return res.status(403).json({ message: 'Not authorized to update this appointment' });
      }
      
      if (date) appointment.date = new Date(date);
      if (time) appointment.time = time;
      if (status) appointment.status = status;
      if (notes !== undefined) appointment.notes = notes;
      
      await appointment.save();
      
      res.json({
        message: 'Appointment updated successfully',
        appointment
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  // Delete an appointment
  router.delete('/:id', auth, async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      
      // Check if user has permission to delete this appointment
      const isAuthorized = 
        req.user.role === 'admin' ||
        appointment.patient.toString() === req.user._id.toString();
      
      if (!isAuthorized) {
        return res.status(403).json({ message: 'Not authorized to delete this appointment' });
      }
      
      await Appointment.findByIdAndDelete(req.params.id);
      
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  export default router;
  