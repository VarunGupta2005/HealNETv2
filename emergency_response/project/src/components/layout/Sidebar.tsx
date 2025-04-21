import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  Users, 
  Pill, 
  FileText, 
  Settings, 
  LifeBuoy, 
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Activity className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <LifeBuoy className="w-5 h-5" />, label: 'Emergency', path: '/emergency' },
    { icon: <Users className="w-5 h-5" />, label: 'Patients', path: '/patients' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Appointments', path: '/appointments' },
    { icon: <Pill className="w-5 h-5" />, label: 'Medications', path: '/medications' },
    { icon: <FileText className="w-5 h-5" />, label: 'Reports', path: '/reports' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[rgb(61,163,241)]">
            <LifeBuoy className="w-6 h-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold text-gray-800">HealNET</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                onClick={() => navigate(item.path)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer ${
                  location.pathname === item.path
                    ? 'text-white bg-[rgb(61,163,241)]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
                {item.label === 'Emergency' && (
                  <span className="ml-auto bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    3
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
          <LogOut className="w-5 h-5 text-gray-500" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;