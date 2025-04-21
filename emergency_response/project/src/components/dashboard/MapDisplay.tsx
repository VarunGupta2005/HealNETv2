import React, { useEffect, useRef } from 'react';
import { Emergency } from '../../types/types';

interface MapDisplayProps {
  currentLocation: { lat: number; lng: number };
  emergencies: Emergency[];
  selectedEmergency: Emergency | null;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  currentLocation,
  emergencies,
  selectedEmergency
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.classList.remove('opacity-0');
          mapRef.current.classList.add('opacity-100');
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="h-[400px] relative">
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-gray-100 opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,11,0/800x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Map controls */}
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-10">
          <div className="flex flex-col space-y-1">
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mock map markers */}
        <div className="absolute top-1/4 left-1/4 flex flex-col items-center animate-pulse">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="mt-1 px-2 py-1 bg-white text-xs rounded shadow">City Hospital</span>
        </div>
        
        <div className="absolute top-2/3 left-1/3 flex flex-col items-center animate-pulse">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="mt-1 px-2 py-1 bg-white text-xs rounded shadow">Memorial Center</span>
        </div>
        
        <div className="absolute top-1/3 right-1/4 flex flex-col items-center animate-pulse">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="mt-1 px-2 py-1 bg-white text-xs rounded shadow">General Medical</span>
        </div>
        
        {/* Ambulance markers */}
        <div className="absolute top-1/2 left-1/2 flex flex-col items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="mt-1 px-2 py-1 bg-white text-xs rounded shadow">Ambulance 1</span>
        </div>
        
        <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="mt-1 px-2 py-1 bg-white text-xs rounded shadow">Ambulance 2</span>
        </div>
        
        {/* Emergency markers */}
        {emergencies.map((emergency, index) => (
          <div 
            key={emergency.id}
            className={`absolute ${
              index === 0 ? 'top-1/3 left-2/5' : 'bottom-1/4 right-1/5'
            } flex flex-col items-center ${
              selectedEmergency?.id === emergency.id ? 'scale-110 z-20' : ''
            } transition-transform`}
          >
            <div className="w-5 h-5 bg-red-500 rounded-full animate-ping-slow"></div>
            <div className="w-5 h-5 bg-red-500 rounded-full absolute"></div>
            <span className="mt-1 px-2 py-1 bg-white text-xs font-medium rounded shadow">
              {emergency.type}
            </span>
          </div>
        ))}
        
        {/* Simulated route */}
        {selectedEmergency && (
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <path 
              d="M200,200 C220,240 280,250 300,280 L400,320" 
              stroke="rgb(61, 163, 241)" 
              strokeWidth="3" 
              strokeDasharray="8,4" 
              fill="none" 
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white p-2 text-xs text-gray-700 rounded shadow z-10">
        © Mapbox
      </div>
    </div>
  );
};

export default MapDisplay;