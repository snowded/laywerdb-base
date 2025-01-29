import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Clock, MapPin, FileText } from 'lucide-react';

interface Appointment {
  _id: string;
  clientId: string;
  caseId: string;
  title: string;
  description: string;
  appointmentDate: string;
  duration: number;
  status: string;
  client: {
    firstName: string;
    lastName: string;
  };
  case?: {
    title: string;
    caseNumber: string;
  };
}

function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${id}`);
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Appointment not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-indigo-900/50 text-indigo-400';
      case 'completed':
        return 'bg-green-900/50 text-green-400';
      case 'cancelled':
        return 'bg-red-900/50 text-red-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <div className="animate-fadeIn">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-gray-200 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-100">{appointment.title}</h1>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <p className="text-gray-400">
                  {new Date(appointment.appointmentDate).toLocaleDateString()} at{' '}
                  {new Date(appointment.appointmentDate).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center text-gray-300">
                <User className="w-5 h-5 text-indigo-400 mr-3" />
                <span>
                  Client: {appointment.client.firstName} {appointment.client.lastName}
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 text-indigo-400 mr-3" />
                <span>Duration: {appointment.duration} minutes</span>
              </div>
            </div>

            {appointment.description && (
              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">Description</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{appointment.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          {appointment.case && (
            <div className="card p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-400" />
                Related Case
              </h2>
              <div className="space-y-2">
                <p className="text-gray-300">{appointment.case.title}</p>
                <p className="text-gray-400 text-sm">Case #{appointment.case.caseNumber}</p>
              </div>
            </div>
          )}

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
              Location
            </h2>
            <p className="text-gray-400">Office</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetail