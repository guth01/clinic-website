// routes/analyticsRoutes.js

import express from 'express';
import clinicStats from '../data/clinicStats.js';

const router = express.Router();

// Get appointments by department
router.get('/appointments-by-department', (req, res) => {
  res.json(clinicStats.appointmentsByDepartment);
});

// Get hourly traffic data
router.get('/hourly-traffic', (req, res) => {
  res.json(clinicStats.hourlyTraffic);
});

export default router;