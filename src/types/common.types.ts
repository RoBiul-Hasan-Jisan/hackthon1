export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: string;
  emergencyContact?: string;
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  createdAt: string;
  updatedAt: string;
}

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

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  doctor: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}