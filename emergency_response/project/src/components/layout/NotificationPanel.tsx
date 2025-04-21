import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'emergency',
      title: 'Emergency Alert',
      message: 'Multi-car accident on Highway 101, 5 ambulances dispatched',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Capacity Warning',
      message: 'Memorial Hospital reaching capacity (85%) in ER department',
      time: '15 minutes ago',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'Responders Available',
      message: '3 additional ambulances now available in downtown area',
      time: '32 minutes ago',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'HealNET will undergo maintenance tonight at 2 AM',
      time: '1 hour ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg overflow-hidden z-40 mr-4">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 hover:bg-gray-50 ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right">
        <button
          type="button"
          className="text-sm font-medium text-[rgb(61,163,241)] hover:text-blue-700"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;