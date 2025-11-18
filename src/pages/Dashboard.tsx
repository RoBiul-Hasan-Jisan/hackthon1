import React, { useState, useEffect } from 'react';
import { StatsCards } from '@/features/dashboard/components/StatsCards';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';
import { HealthMetrics } from '@/features/dashboard/components/HealthMetrics';
import { AppointmentCalendar } from '@/features/appointments/components/AppointmentCalendar';
import { Appointment } from '@/features/appointments/types/appointments.types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalPatients: 1247,
    totalAppointments: 356,
    todayAppointments: 23,
    availableDoctors: 18,
  });

  const [recentActivities] = useState([
    {
      id: '1',
      type: 'appointment' as const,
      description: 'New appointment scheduled with John Doe',
      timestamp: new Date().toISOString(),
      user: 'Dr. Smith'
    },
    {
      id: '2',
      type: 'patient' as const,
      description: 'New patient registration: Jane Smith',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      user: 'Reception'
    },
    {
      id: '3',
      type: 'medical_record' as const,
      description: 'Medical record updated for Robert Johnson',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      user: 'Dr. Brown'
    }
  ]);

  const [todayAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Doe',
      doctorName: 'Smith',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      status: 'scheduled',
      type: 'consultation',
      notes: 'Regular checkup',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Jane Smith',
      doctorName: 'Johnson',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      duration: 45,
      status: 'scheduled',
      type: 'checkup',
      notes: 'Follow-up appointment',
      createdAt: new Date().toISOString()
    }
  ]);

  const handleAppointmentClick = (appointment: Appointment) => {
    console.log('Appointment clicked:', appointment);
    // Navigate to appointment details or open modal
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your healthcare management dashboard</p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AppointmentCalendar 
            appointments={todayAppointments}
            onAppointmentClick={handleAppointmentClick}
          />
          <HealthMetrics />
        </div>
        
        <div className="lg:col-span-1">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;