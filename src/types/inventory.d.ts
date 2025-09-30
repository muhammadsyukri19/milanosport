// src/types/inventory.d.ts

export interface Field {
  id: string;
  type: "Mini Soccer" | "Futsal" | "Badminton" | "Padel";
  name: string;
  pricePerSlot: number; // Harga dasar per jam
  description: string;
  imageUrl: string; // URL gambar dummy
}

export interface ScheduleSlot {
  date: string; // Format YYYY-MM-DD
  fieldId: string;
  timeSlot: string; // Format HH:MM (e.g., '19:00')
  status: "Available" | "Booked" | "Blocked";
  bookedBy?: string;
}
