import React from 'react';
import { Card } from '@/components/ui/Card';
import { Appointment } from '../types/appointments.types';
import { formatDate } from '@/utils/helpers';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments,
  onAppointmentClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return '💬';
      case 'checkup':
        return '🩺';
      case 'surgery':
        return '🔪';
      case 'follow-up':
        return '↩️';
      default:
        return '📅';
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onAppointmentClick(appointment)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">
                  {getTypeIcon(appointment.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {appointment.patientName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    with Dr. {appointment.doctorName} • {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.type} • {appointment.duration}min
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  →
                </button>
              </div>
            </div>
          ))}
          
          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointments scheduled for today
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};