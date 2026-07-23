import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (dateString, formatStr = 'dd MMMM yyyy') => {
  if (!dateString) return '-';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr, { locale: id });
  } catch (error) {
    return dateString;
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return '-';
  // If it's just HH:mm or HH:mm:ss, return as is or process
  return timeString;
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
