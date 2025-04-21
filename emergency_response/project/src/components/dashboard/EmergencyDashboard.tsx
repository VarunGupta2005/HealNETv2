import React, { useState } from 'react';
import MapDisplay from './MapDisplay';
import HospitalSearch from './HospitalSearch';
import ResponderTracker from './ResponderTracker';
import RouteOptimizer from './RouteOptimizer';
import QuickActions from './QuickActions';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Emergency } from '../../types/types';
import StatusCard from './StatusCard';

const EmergencyDashboard: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194
  });

  const [activeEmergencies, setActiveEmergencies] = useState<Emergency[]>([
    {
      id: 'e-001',
      type: 'Traffic Accident',
      severity: 'Critical',
      location: { lat: 37.7849, lng: -122.4294 },
      assignedResponders: 2,
      estimatedArrival: '4 min',
      status: 'En route',
      timestamp: new Date().getTime() - 360000
    },
    {
      id: 'e-002',
      type: 'Cardiac Arrest',
      severity: 'Critical',
      location: { lat: 37.7649, lng: -122.4094 },
      assignedResponders: 1,
      estimatedArrival: '2 min',
      status: 'En route',
      timestamp: new Date().getTime() - 180000
    }
  ]);

  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);

  const handleEmergencySelect = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
  };

  const metrics = [
    { label: 'Active Emergencies', value: '8', change: '+2', trend: 'up' },
    { label: 'Available Ambulances', value: '12', change: '-3', trend: 'down' },
    { label: 'Avg. Response Time', value: '8.2 min', change: '-0.5', trend: 'down', positive: true },
    { label: 'ER Capacity', value: '76%', change: '+12%', trend: 'up', positive: false }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              </div>
              <div className={`flex items-center ${
                (metric.positive && metric.trend === 'down') || (!metric.positive && metric.trend === 'down')
                  ? 'text-green-500'
                  : (metric.positive && metric.trend === 'up') || (!metric.positive && metric.trend === 'up')
                  ? metric.positive ? 'text-green-500' : 'text-red-500'
                  : 'text-gray-400'
              }`}>
                <span className="text-sm font-medium">{metric.change}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 ml-1" />
                ) : (
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Emergency Response Map</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                  <span className="text-xs text-gray-600">Hospitals</span>
                </div>
                <div className="flex items-center">
                  <span className="block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-xs text-gray-600">Ambulances</span>
                </div>
                <div className="flex items-center">
                  <span className="block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                  <span className="text-xs text-gray-600">Emergency</span>
                </div>
              </div>
            </div>
            <MapDisplay 
              currentLocation={currentLocation} 
              emergencies={activeEmergencies} 
              selectedEmergency={selectedEmergency}
            />
          </div>
        </div>

        <div className="space-y-6">
          <StatusCard />
            
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Emergency Alerts</h2>
            </div>
            <div className="p-4 divide-y divide-gray-200 max-h-64 overflow-y-auto">
              {activeEmergencies.map((emergency) => (
                <div 
                  key={emergency.id} 
                  className={`py-3 cursor-pointer hover:bg-gray-50 ${selectedEmergency?.id === emergency.id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleEmergencySelect(emergency)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <AlertTriangle className={`h-5 w-5 ${
                        emergency.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'
                      }`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">{emergency.type}</p>
                        <span className={`text-xs rounded-full px-2 py-1 font-medium ${
                          emergency.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {emergency.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Responders: {emergency.assignedResponders} • ETA: {emergency.estimatedArrival}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(emergency.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
          <QuickActions />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HospitalSearch currentLocation={currentLocation} />
        <ResponderTracker />
        <RouteOptimizer />
      </div>
    </div>
  );
};

export default EmergencyDashboard;