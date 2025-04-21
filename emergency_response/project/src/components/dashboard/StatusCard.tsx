import React from 'react';
import { Clock } from 'lucide-react';

const StatusCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-[rgb(61,163,241)] text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Emergency Status</h2>
          <Clock className="h-5 w-5" />
        </div>
        <p className="text-sm text-blue-100 mt-1">Live system monitoring</p>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500">System Status</span>
          <div className="flex items-center">
            <span className="block w-2 h-2 rounded-full bg-green-400 mr-1.5"></span>
            <span className="text-sm font-medium text-green-700">Operational</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Response Network</span>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Communications</span>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Hospital Capacity</span>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '76%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Responder Availability</span>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <span>Updated: 2 minutes ago</span>
        <a href="#" className="text-[rgb(61,163,241)] hover:text-blue-700">View Details</a>
      </div>
    </div>
  );
};

export default StatusCard;