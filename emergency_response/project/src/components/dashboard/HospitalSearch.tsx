import React, { useState } from 'react';
import { Search, MapPin, Clock, Phone, User } from 'lucide-react';

interface HospitalSearchProps {
  currentLocation: { lat: number; lng: number };
}

const HospitalSearch: React.FC<HospitalSearchProps> = ({ currentLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  
  const specialties = [
    'All Specialties',
    'Emergency Care',
    'Trauma Center',
    'Cardiac Care',
    'Burn Unit',
    'Pediatric',
    'Neurology'
  ];
  
  const hospitals = [
    {
      id: 'h-001',
      name: 'City Memorial Hospital',
      distance: '1.2 miles',
      waitTime: '15 min',
      erCapacity: 'Medium',
      specialty: ['Emergency Care', 'Trauma Center'],
      phone: '(415) 555-1234',
      address: '123 Medical Dr, San Francisco, CA'
    },
    {
      id: 'h-002',
      name: 'General Medical Center',
      distance: '2.5 miles',
      waitTime: '5 min',
      erCapacity: 'High',
      specialty: ['Emergency Care', 'Cardiac Care'],
      phone: '(415) 555-5678',
      address: '456 Health Ave, San Francisco, CA'
    },
    {
      id: 'h-003',
      name: 'Children\'s Hospital',
      distance: '3.7 miles',
      waitTime: '10 min',
      erCapacity: 'Low',
      specialty: ['Emergency Care', 'Pediatric'],
      phone: '(415) 555-9012',
      address: '789 Care Blvd, San Francisco, CA'
    }
  ];
  
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === '' || specialtyFilter === 'All Specialties' || 
                            hospital.specialty.includes(specialtyFilter);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Nearest Hospitals</h2>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[rgb(61,163,241)] focus:border-[rgb(61,163,241)]"
            placeholder="Search hospitals by name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mt-3">
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Specialty
          </label>
          <select
            id="specialty"
            className="block w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(61,163,241)] focus:border-[rgb(61,163,241)]"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{hospital.name}</h3>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{hospital.distance} • {hospital.address}</span>
                </div>
              </div>
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {hospital.erCapacity} Capacity
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="flex items-center text-xs">
                <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <span className="text-gray-600">Wait: {hospital.waitTime}</span>
              </div>
              <div className="flex items-center text-xs">
                <User className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <span className="text-gray-600">{hospital.specialty.join(', ')}</span>
              </div>
              <div className="flex items-center text-xs">
                <Phone className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <span className="text-gray-600">{hospital.phone}</span>
              </div>
            </div>
            
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 text-xs bg-[rgb(61,163,241)] text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors">
                Route To Hospital
              </button>
              <button className="text-xs border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalSearch;