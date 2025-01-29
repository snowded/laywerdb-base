import React from 'react';
import { Plus, Search, Calendar } from 'lucide-react';

function Appointments() {
  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-4 sm:mb-0">Appointments</h1>
        <button className="btn btn-primary">
          <Plus size={20} className="mr-2" />
        </button>
      </div>

      <div className="card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search appointments..."
            className="input pl-10"
          />
        </div>
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="table-header px-6 py-3 text-left">Date & Time</th>
                <th className="table-header px-6 py-3 text-left">Client</th>
                <th className="table-header px-6 py-3 text-left">Title</th>
                <th className="table-header px-6 py-3 text-left">Duration</th>
                <th className="table-header px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {/* Sample data - replace with actual data */}
              <tr className="table-row">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-indigo-400 mr-2" />
                    <div className="table-cell">Mar 15, 2024 10:00 AM</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="table-cell">John Doe</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="table-cell">Initial Consultation</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="table-cell">1 hour</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-900/50 text-indigo-400">
                    Scheduled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Appointments;