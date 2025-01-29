import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  description: String,
  caseNumber: String,
  status: {
    type: String,
    enum: ['open', 'closed', 'pending', 'archived'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  startDate: { type: Date, default: Date.now },
  courtDate: Date,
}, { timestamps: true });

export const Case = mongoose.model('Case', caseSchema);