import React from 'react';
import { Map, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

const RouteOptimizer: React.FC = () => {
  const routes = [
    {
      id: 'route-001',
      from: 'Richmond District',
      to: 'SF General Hospital',
      distance: '3.8 miles',
      eta: '12 min',
      trafficStatus: 'moderate',
      alternate: true
    },
    {
      id: 'route-002',
      from: 'Financial District',
      to: 'UCSF Medical Center',
      distance: '4.2 miles',
      eta: '18 min',
      trafficStatus: 'heavy',
      alternate: false
    },
    {
      id: 'route-003',
      from: 'Mission District',
      to: 'Kaiser Hospital',
      distance: '2.5 miles',
      eta: '9 min',
      trafficStatus: 'light',
      alternate: true
    }
  ];
  
  const getTrafficStatusColor = (status: string) => {
    switch (status) {
      case 'light':
        return 'text-green-500';
      case 'moderate':
        return 'text-amber-500';
      case 'heavy':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Route Optimizer</h2>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
        {routes.map((route) => (
          <div key={route.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 flex-1">
                  <span className="text-sm font-medium">{route.from}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm font-medium">{route.to}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`flex items-center ${getTrafficStatusColor(route.trafficStatus)}`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span className="ml-1.5 text-xs capitalize">{route.trafficStatus}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="flex items-center text-xs text-gray-600">
                <Map className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <span>{route.distance}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <span>ETA: {route.eta}</span>
              </div>
              {route.alternate && (
                <div className="flex items-center text-xs text-green-600">
                  <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Alternate Route</span>
                </div>
              )}
            </div>
            
            {route.trafficStatus === 'heavy' && (
              <div className="mt-2 text-xs flex items-start text-amber-700 bg-amber-50 p-2 rounded">
                <AlertTriangle className="h-3.5 w-3.5 mr-1 flex-shrink-0 mt-0.5" />
                <span>
                  Traffic incident reported on main route. Consider taking alternate path via Oak Street.
                </span>
              </div>
            )}
            
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 text-xs bg-[rgb(61,163,241)] text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition-colors">
                Open Route
              </button>
              <button className="text-xs border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md hover:bg-gray-50 transition-colors">
                Alternatives
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <button className="text-xs text-[rgb(61,163,241)] hover:text-blue-700 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Calculate New Route
        </button>
        <button className="text-xs text-[rgb(61,163,241)] hover:text-blue-700">
          View Traffic Alerts
        </button>
      </div>
    </div>
  );
};

export default RouteOptimizer;