import React, { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  id="search"
                  className="block w-full bg-gray-50 py-2 pl-10 pr-3 border border-gray-200 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[rgb(61,163,241)] focus:border-[rgb(61,163,241)] sm:text-sm"
                  placeholder="Search hospitals, responders..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="ml-3 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg"
                  alt="User avatar"
                />
                <span className="hidden md:inline-block ml-2 text-sm font-medium text-gray-700">
                  Dr. Shubham Sharma
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
      
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <nav className="grid gap-y-4">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-[rgb(61,163,241)] rounded-md"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Emergency
              <span className="ml-auto bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                3
              </span>
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Patients
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Appointments
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;