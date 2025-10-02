import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Base API configuration
const API_BASE_URL = "http://localhost:5000/api"; // Adjust this to your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken"); // Adjust based on your auth implementation
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Booking API interfaces
export interface CreateBookingRequest {
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  paymentMethod: string;
  notes?: string;
  proofOfPayment?: File;
}

export interface BookingResponse {
  status: number;
  data: {
    _id: string;
    userId: {
      _id: string;
      name: string;
      email: string;
    };
    fieldId: {
      _id: string;
      name: string;
      pricePerHour: number;
      sport: {
        _id: string;
        sportName: string;
      };
    };
    date: string;
    startTime: string;
    endTime: string;
    totalHours: number;
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: string;
    status: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface BookingListResponse {
  status: number;
  data: {
    docs: BookingResponse["data"][];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message: string;
}

// API functions
export const bookingApi = {
  // Create a new booking
  createBooking: async (bookingData: CreateBookingRequest): Promise<BookingResponse> => {
    try {
      const formData = new FormData();

      // Append all booking data to FormData
      Object.entries(bookingData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "proofOfPayment" && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.post("/bookings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal membuat booking");
    }
  },

  // Get user's bookings
  getUserBookings: async (params?: { status?: string; page?: number; limit?: number }): Promise<BookingListResponse> => {
    try {
      const response = await api.get("/bookings/user", { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil daftar booking");
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId: string): Promise<BookingResponse> => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil detail booking");
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId: string): Promise<BookingResponse> => {
    try {
      const response = await api.put(`/bookings/${bookingId}/cancel`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal membatalkan booking");
    }
  },

  // Check booking conflicts (helper function)
  checkAvailability: async (params: { fieldId: string; date: string; startTime: string; endTime: string }): Promise<{ available: boolean; message?: string }> => {
    try {
      await api.post("/bookings/check-availability", params);
      return { available: true };
    } catch (error: any) {
      return {
        available: false,
        message: error.response?.data?.message || "Waktu tidak tersedia",
      };
    }
  },
};

// Utility functions for time calculations
export const timeUtils = {
  // Calculate end time from start time and duration
  calculateEndTime: (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHour = hours + duration;
    const endMinutes = minutes;

    return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
  },

  // Convert time string to minutes
  timeToMinutes: (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  },

  // Convert minutes to time string
  minutesToTime: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  },

  // Format date for API
  formatDateForAPI: (date: Date): string => {
    return date.toISOString().split("T")[0];
  },
};

export default bookingApi;
