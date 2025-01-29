import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Briefcase, Mail, Phone, MapPin } from 'lucide-react';

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/clients/${id}`);
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Client not found</p>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-100">
                  {client.firstName} {client.lastName}
                </h1>
                <p className="text-gray-400 mt-1">Client since {new Date(client.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 text-indigo-400 mr-3" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 text-indigo-400 mr-3" />
                <span>{client.phone || 'No phone number'}</span>
              </div>
              <div className="flex items-center text-gray-300 md:col-span-2">
                <MapPin className="w-5 h-5 text-indigo-400 mr-3" />
                <span>{client.address || 'No address provided'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-indigo-400" />
              Active Cases
            </h2>
            <div className="space-y-3">
              {/* Add cases list here when implemented */}
              <p className="text-gray-400">No active cases</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
              Upcoming Appointments
            </h2>
            <div className="space-y-3">
              {/* Add appointments list here when implemented */}
              <p className="text-gray-400">No upcoming appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail