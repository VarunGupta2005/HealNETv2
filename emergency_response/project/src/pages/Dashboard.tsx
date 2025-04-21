import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import EmergencyDashboard from '../components/dashboard/EmergencyDashboard';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <EmergencyDashboard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;