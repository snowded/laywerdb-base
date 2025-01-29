import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
}, { timestamps: true });

export const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);