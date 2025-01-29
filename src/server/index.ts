import express from 'express';
import cors from 'cors';
import { connectDB } from '../lib/db';
import { Client } from '../models/Client';
import { Case } from '../models/Case';
import { Appointment } from '../models/Appointment';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Client routes
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching clients' });
  }
});

app.get('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching client' });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: 'Error creating client' });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: 'Error updating client' });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting client' });
  }
});

// Case routes
app.get('/api/cases', async (req, res) => {
  try {
    const cases = await Case.find()
      .populate('clientId', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cases' });
  }
});

app.get('/api/cases/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id)
      .populate('clientId', 'firstName lastName');
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json(caseData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching case' });
  }
});

app.post('/api/cases', async (req, res) => {
  try {
    const caseData = new Case(req.body);
    await caseData.save();
    res.status(201).json(caseData);
  } catch (error) {
    res.status(400).json({ error: 'Error creating case' });
  }
});

app.put('/api/cases/:id', async (req, res) => {
  try {
    const caseData = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(caseData);
  } catch (error) {
    res.status(400).json({ error: 'Error updating case' });
  }
});

app.delete('/api/cases/:id', async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting case' });
  }
});

// Appointment routes
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('clientId', 'firstName lastName')
      .populate('caseId', 'title caseNumber')
      .sort({ appointmentDate: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

app.get('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('clientId', 'firstName lastName')
      .populate('caseId', 'title caseNumber');
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointment' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Error creating appointment' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Error updating appointment' });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting appointment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});