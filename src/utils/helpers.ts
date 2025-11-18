import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return 'Invalid Date';
  }
};

export const formatDateTime = (dateString: string, timeString: string): string => {
  try {
    const dateTime = parseISO(`${dateString}T${timeString}`);
    return format(dateTime, 'MMM dd, yyyy • hh:mm a');
  } catch {
    return 'Invalid Date/Time';
  }
};

export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};