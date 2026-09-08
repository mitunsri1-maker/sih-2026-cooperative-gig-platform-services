export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatTimeSlot(slot) {
  return slot || 'Flexible Time';
}

export function getStatusBadgeInfo(status) {
  switch (status) {
    case 'REQUESTED':
      return {
        label: 'Booking Requested',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        dot: 'bg-amber-500'
      };
    case 'ACCEPTED':
      return {
        label: 'Accepted by Provider',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        dot: 'bg-blue-500'
      };
    case 'IN_PROGRESS':
      return {
        label: 'Work In Progress',
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        dot: 'bg-purple-500'
      };
    case 'COMPLETED':
      return {
        label: 'Job Completed (Pending Rating)',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dot: 'bg-emerald-500'
      };
    case 'RATED':
      return {
        label: 'Completed & Rated ★',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-400',
        dot: 'bg-emerald-600'
      };
    default:
      return {
        label: status,
        color: 'bg-slate-100 text-slate-800 border-slate-300',
        dot: 'bg-slate-400'
      };
  }
}
