export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'checkup' | 'surgery' | 'follow-up';
  notes?: string;
  createdAt: string;
}

export interface AppointmentFormData {
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'checkup' | 'surgery' | 'follow-up';
  notes?: string;
}