import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600">Manage your application settings</p>
      <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-yellow-800">
          This is a placeholder settings page. In a real application, you would 
          have various configuration options here.
        </p>
      </div>
    </div>
  );
};

export default Settings;