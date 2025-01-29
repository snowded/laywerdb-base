import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
  title: { type: String, required: true },
  description: String,
  appointmentDate: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // in minutes
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);