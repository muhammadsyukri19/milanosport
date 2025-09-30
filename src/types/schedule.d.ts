export interface FieldSchedule {
  date: string; // Contoh: '2025-10-01'
  fieldId: string; // Contoh: 'FT-01'
  timeSlot: string; // Contoh: '19:00'
  status: "Available" | "Booked" | "Blocked";
  bookedBy?: string; // Opsional, hanya ada jika status 'Booked'
}
