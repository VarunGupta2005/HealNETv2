import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { AlertTriangle, Phone, Ambulance, Clock } from 'lucide-react';

const Emergency: React.FC = () => {
  const emergencies = [
    {
      id: 'E001',
      type: 'Traffic Accident',
      location: 'Highway 101, Mile Marker 385',
      severity: 'Critical',
      respondersAssigned: 3,
      eta: '5 minutes',
      status: 'En Route',
      timestamp: new Date().toISOString()
    },
    {
      id: 'E002',
      type: 'Cardiac Emergency',
      location: '742 Evergreen Terrace',
      severity: 'Critical',
      respondersAssigned: 2,
      eta: '3 minutes',
      status: 'En Route',
      timestamp: new Date().toISOString()
    },
    // Add more emergencies as needed
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Emergency Response Center</h1>
              <p className="mt-1 text-sm text-gray-500">Active emergencies and response coordination</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-red-800">Active Emergencies</h2>
                    <p className="text-3xl font-bold text-red-900">5</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Ambulance className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-green-800">Available Units</h2>
                    <p className="text-3xl font-bold text-green-900">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-blue-800">Avg. Response Time</h2>
                    <p className="text-3xl font-bold text-blue-900">4.5 min</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Active Emergency Calls</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {emergencies.map((emergency) => (
                  <div key={emergency.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full ${
                          emergency.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{emergency.type}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            emergency.severity === 'Critical'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {emergency.severity}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{emergency.location}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Ambulance className="w-4 h-4 mr-1" />
                            {emergency.respondersAssigned} units assigned
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            ETA: {emergency.eta}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="flex-1 bg-[rgb(61,163,241)] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Responders
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Emergency;