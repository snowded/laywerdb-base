import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, AlertCircle } from 'lucide-react';

interface Case {
  _id: string;
  clientId: string;
  title: string;
  description: string;
  caseNumber: string;
  status: string;
  priority: string;
  startDate: string;
  courtDate: string;
  client: {
    firstName: string;
    lastName: string;
  };
}

function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await fetch(`/api/cases/${id}`);
        const data = await response.json();
        setCaseData(data);
      } catch (error) {
        console.error('Error fetching case:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Case not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-900/50 text-green-400';
      case 'closed':
        return 'bg-gray-900/50 text-gray-400';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-900/50 text-red-400';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'low':
        return 'bg-green-900/50 text-green-400';
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
                  <h1 className="text-2xl font-bold text-gray-100">{caseData.title}</h1>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(caseData.status)}`}>
                    {caseData.status}
                  </span>
                </div>
                <p className="text-gray-400">Case #{caseData.caseNumber}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(caseData.priority)}`}>
                {caseData.priority} Priority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center text-gray-300">
                <User className="w-5 h-5 text-indigo-400 mr-3" />
                <span>
                  Client: {caseData.client.firstName} {caseData.client.lastName}
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 text-indigo-400 mr-3" />
                <span>Started: {new Date(caseData.startDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">Description</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{caseData.description || 'No description provided'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
              Important Dates
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Court Date</p>
                <p className="text-gray-200">
                  {caseData.courtDate ? new Date(caseData.courtDate).toLocaleDateString() : 'Not scheduled'}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-indigo-400" />
              Notes
            </h2>
            <div className="space-y-3">
              <p className="text-gray-400">No notes added yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDetail