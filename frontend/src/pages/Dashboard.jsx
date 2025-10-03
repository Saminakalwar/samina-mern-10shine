import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)] bg-gray-100 pt-14">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to Dashboard
        </h2>
      </div>
    </>
  );
};

export default Dashboard;
