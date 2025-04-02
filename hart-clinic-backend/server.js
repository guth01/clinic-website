import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointment.js';
// Add this with your other requires
import diagnosisRoutes from './routes/diagnosis.js';
import userRoutes from './routes/userRoutes.js';
import userappointmentRoutes from './routes/userappointmentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
// Add this with your other app.use statements
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', userappointmentRoutes);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hart Clinic API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});