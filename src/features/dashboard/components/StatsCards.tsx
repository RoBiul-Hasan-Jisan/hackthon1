import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatsCardsProps {
  stats: {
    totalPatients: number;
    totalAppointments: number;
    todayAppointments: number;
    availableDoctors: number;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: '👥',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: '📅',
      color: 'bg-green-500',
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: '🕐',
      color: 'bg-orange-500',
    },
    {
      title: 'Available Doctors',
      value: stats.availableDoctors,
      icon: '👨‍⚕️',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item) => (
        <Card key={item.title} className="p-6">
          <div className="flex items-center">
            <div className={`${item.color} rounded-lg p-3 mr-4`}>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};