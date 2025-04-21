import React from 'react';
import { Ambulance, Phone, AlertTriangle, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <Ambulance className="h-5 w-5" />,
      label: 'Dispatch Ambulance',
      color: 'bg-red-100 text-red-700',
      hover: 'hover:bg-red-200 hover:text-red-800'
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'Declare Emergency',
      color: 'bg-amber-100 text-amber-700',
      hover: 'hover:bg-amber-200 hover:text-amber-800'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Contact Hospital',
      color: 'bg-blue-100 text-blue-700',
      hover: 'hover:bg-blue-200 hover:text-blue-800'
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Coordinate Teams',
      color: 'bg-purple-100 text-purple-700',
      hover: 'hover:bg-purple-200 hover:text-purple-800'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${action.color} ${action.hover}`}
            >
              <div className="mb-2">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          <button className="w-full py-2 bg-[rgb(61,163,241)] hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Generate Incident Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;