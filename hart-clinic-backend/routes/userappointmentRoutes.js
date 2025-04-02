import express from 'express';
import { getAppointments, cancelAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments', getAppointments);
router.delete('/appointments/:id', cancelAppointment);

export default router;
