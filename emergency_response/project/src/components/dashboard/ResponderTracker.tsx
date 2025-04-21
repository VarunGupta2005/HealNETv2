import React, { useState } from 'react';
import { CircleSlash, Clock, Filter, Truck } from 'lucide-react';

const ResponderTracker: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  
  const responders = [
    {
      id: 'r-001',
      unit: 'Ambulance 101',
      status: 'available',
      location: 'Downtown, 7th St & Market',
      lastUpdated: '2 min ago',
      equipment: ['ALS', 'Ventilator', 'Cardiac Monitor'],
      eta: null
    },
    {
      id: 'r-002',
      unit: 'Ambulance 204',
      status: 'en-route',
      location: 'Mission District',
      lastUpdated: '5 min ago',
      equipment: ['BLS', 'Defibrillator'],
      eta: '12 min'
    },
    {
      id: 'r-003',
      unit: 'Medical 305',
      status: 'on-scene',
      location: 'Richmond District',
      lastUpdated: '8 min ago',
      equipment: ['ALS', 'Trauma Kit'],
      eta: null
    },
    {
      id: 'r-004',
      unit: 'Ambulance 422',
      status: 'returning',
      location: 'Sunset District',
      lastUpdated: '3 min ago',
      equipment: ['ALS', 'Ventilator'],
      eta: '15 min'
    }
  ];
  
  const filteredResponders = filterStatus === 'all' 
    ? responders
    : responders.filter(r => r.status === filterStatus);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'en-route':
        return 'bg-blue-100 text-blue-800';
      case 'on-scene':
        return 'bg-amber-100 text-amber-800';
      case 'returning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Emergency Responders</h2>
        <div className="flex">
          <button className="p-1.5 hover:bg-gray-100 rounded-md" title="Refresh">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <div className="relative ml-2">
            <button 
              className="p-1.5 hover:bg-gray-100 rounded-md flex items-center"
              title="Filter"
            >
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-b border-gray-200 bg-gray-50 flex space-x-2">
        <button
          className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
            filterStatus === 'all' 
              ? 'bg-[rgb(61,163,241)] text-white border-[rgb(61,163,241)]' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button
          className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
            filterStatus === 'available' 
              ? 'bg-[rgb(61,163,241)] text-white border-[rgb(61,163,241)]' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setFilterStatus('available')}
        >
          Available
        </button>
        <button
          className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
            filterStatus === 'en-route' 
              ? 'bg-[rgb(61,163,241)] text-white border-[rgb(61,163,241)]' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setFilterStatus('en-route')}
        >
          En Route
        </button>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
        {filteredResponders.map((responder) => (
          <div key={responder.id} className="p-3 hover:bg-gray-50">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{responder.unit}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(responder.status)}`}>
                      {responder.status.charAt(0).toUpperCase() + responder.status.slice(1)}
                    </span>
                    {responder.eta && (
                      <span className="ml-2 flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-0.5" />
                        ETA: {responder.eta}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">{responder.location}</span>
                <span className="text-xs text-gray-400 mt-1">Updated {responder.lastUpdated}</span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center space-x-2">
              {responder.equipment.map((item, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                  {item}
                </span>
              ))}
            </div>
            
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 text-xs bg-[rgb(61,163,241)] text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors flex justify-center items-center">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Dispatch
              </button>
              <button className="text-xs border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md hover:bg-gray-50 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredResponders.length === 0 && (
        <div className="p-6 flex flex-col items-center justify-center text-gray-500">
          <CircleSlash className="h-8 w-8 mb-2" />
          <p className="text-sm">No responders match the current filter</p>
        </div>
      )}
    </div>
  );
};

export default ResponderTracker;