export interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  todayAppointments: number;
  availableDoctors: number;
}

export interface RecentActivity {
  id: string;
  type: 'appointment' | 'patient' | 'medical_record';
  description: string;
  timestamp: string;
  user: string;
}