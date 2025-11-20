import { Feature, Testimonial, StatItem } from '../types/home';

export const features: Feature[] = [
  {
    title: 'Patient Management',
    description: 'Comprehensive patient records, medical history, and real-time health monitoring with AI-powered insights.',
    icon: '👥',
    gradient: 'from-blue-500 to-cyan-500',
    stats: '10K+ Patients Managed'
  },
  {
    title: 'Appointment Scheduling',
    description: 'Smart scheduling with automated reminders, conflict detection, and telehealth integration.',
    icon: '📅',
    gradient: 'from-green-500 to-emerald-500',
    stats: '50K+ Appointments Monthly'
  },
  {
    title: 'Medical Records',
    description: 'Secure, HIPAA-compliant storage with advanced analytics and predictive health trends.',
    icon: '📋',
    gradient: 'from-purple-500 to-pink-500',
    stats: '99.9% Uptime'
  },
  {
    title: 'Doctor Portal',
    description: 'AI-assisted diagnostics, prescription management, and collaborative care coordination.',
    icon: '👨‍⚕️',
    gradient: 'from-orange-500 to-red-500',
    stats: '500+ Healthcare Partners'
  }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Medical Officer, City Hospital',
    content: 'MediCare Health transformed our practice. Patient wait times decreased by 40% and our team\'s efficiency improved dramatically.',
    avatar: '👩‍⚕️'
  },
  {
    name: 'Dr. Michael Rodriguez',
    role: 'Cardiologist, Heart Center',
    content: 'The AI-powered insights have helped us identify at-risk patients earlier. This platform is revolutionizing preventive care.',
    avatar: '👨‍⚕️'
  },
  {
    name: 'Emily Thompson',
    role: 'Practice Manager, Family Health',
    content: 'From scheduling to billing, everything is streamlined. Our administrative workload decreased by 60% since implementation.',
    avatar: '💼'
  }
];

export const stats: StatItem[] = [
  { number: '50K+', label: 'Patients Served' },
  { number: '500+', label: 'Healthcare Providers' },
  { number: '99.9%', label: 'Satisfaction Rate' },
  { number: '24/7', label: 'Support Available' }
];

// Export types from this file as well
export type { Feature, Testimonial, StatItem };