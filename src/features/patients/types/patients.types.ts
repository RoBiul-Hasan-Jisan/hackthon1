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

export interface PatientFormData {
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
}