import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AppointmentList } from '@/features/appointments/components/AppointmentList';
import { AppointmentForm } from '@/features/appointments/components/AppointmentForm';
import { Appointment, AppointmentFormData } from '@/features/appointments/types/appointments.types';
import { generateId } from '@/utils/helpers';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Doe',
      doctorName: 'Smith',
      date: '2024-01-15',
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
      date: '2024-01-16',
      time: '14:30',
      duration: 45,
      status: 'scheduled',
      type: 'checkup',
      notes: 'Follow-up appointment',
      createdAt: new Date().toISOString()
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAppointment = (data: AppointmentFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newAppointment: Appointment = {
        ...data,
        id: generateId(),
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      setAppointments(prev => [...prev, newAppointment]);
      setIsFormOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateAppointment = (data: AppointmentFormData) => {
    if (!editingAppointment) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.map(appointment =>
        appointment.id === editingAppointment.id
          ? { ...data, id: editingAppointment.id, status: editingAppointment.status, createdAt: editingAppointment.createdAt }
          : appointment
      ));
      setEditingAppointment(null);
      setIsFormOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
    }
  };

  const handleStatusChange = (appointmentId: string, status: string) => {
    setAppointments(prev => prev.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: status as any }
        : appointment
    ));
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: AppointmentFormData) => {
    if (editingAppointment) {
      handleUpdateAppointment(data);
    } else {
      handleCreateAppointment(data);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAppointment(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage and schedule patient appointments</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          Schedule Appointment
        </Button>
      </div>

      <AppointmentList
        appointments={appointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
        onStatusChange={handleStatusChange}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        title={editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        size="lg"
      >
        <AppointmentForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
          initialData={editingAppointment || undefined}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Appointments;