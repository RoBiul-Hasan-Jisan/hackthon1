export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const GENDERS = ['male', 'female', 'other'] as const;

export const APPOINTMENT_TYPES = [
  'consultation',
  'checkup', 
  'surgery',
  'follow-up'
] as const;

export const APPOINTMENT_STATUS = [
  'scheduled',
  'completed',
  'cancelled',
  'no-show'
] as const;

export const SPECIALIZATIONS = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology',
  'Dentistry',
  'Psychiatry'
];