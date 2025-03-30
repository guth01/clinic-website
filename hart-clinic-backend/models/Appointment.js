import mongoose from 'mongoose';

const genderEnum = ['Male', 'Female', 'Other', 'Prefer not to say'];
const timeEnum = [
  'Morning (9:00 AM - 12:00 PM)',
  'Afternoon (1:00 PM - 5:00 PM)',
  'Evening (6:00 PM - 8:00 PM)'
];

const AppointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { 
    type: String, 
    required: true, 
    enum: genderEnum,
    set: (val) => genderEnum.find(g => g.toLowerCase() === val.toLowerCase()) || val 
  },
  contactNumber: { 
    type: String, 
    required: true, 
    match: [/^\d{10,15}$/, 'Invalid contact number']
  },
  email: { 
    type: String, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  preferredDate: { type: Date, required: true },
  preferredTime: { 
    type: String, 
    required: true, 
    enum: timeEnum,
    set: (val) => timeEnum.find(t => t.toLowerCase().includes(val.toLowerCase())) || val
  },
  reasonForAppointment: { type: String, required: true, trim: true },
  preferredDepartment: { type: String, required: true, trim: true },
  preferredDoctor: { type: String, trim: true },
  existingConditions: { type: String, default: '', trim: true },
  currentMedications: { type: String, default: '', trim: true },
  allergies: { type: String, default: '', trim: true },
  insuranceDetails: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', AppointmentSchema);
