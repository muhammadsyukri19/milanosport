import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.60:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Field interfaces matching backend schema
export interface Field {
  _id: string;
  name: string;
  sport: string; // "Futsal" | "MiniSoccer" | "Badminton" | "Padel"
  pricePerHour: number;
  availability: Array<{
    dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
    openTime: string; // "HH:MM"
    closeTime: string; // "HH:MM"
  }>;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FieldResponse {
  status: number;
  data: Field[];
  message: string;
}

export interface FieldDetailResponse {
  status: number;
  data: Field;
  message: string;
}

export interface FieldAvailabilityResponse {
  status: number;
  data: {
    available: boolean;
    openTime?: string;
    closeTime?: string;
    bookedSlots?: Array<{
      start: string;
      end: string;
    }>;
    date?: string;
    message?: string;
  };
  message: string;
}

// Field API functions
export const fieldApi = {
  // Get all active fields
  getAllFields: async (): Promise<FieldResponse> => {
    try {
      const response = await api.get("/fields");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil data lapangan");
    }
  },

  // Get field by ID
  getFieldById: async (fieldId: string): Promise<FieldDetailResponse> => {
    try {
      const response = await api.get(`/fields/${fieldId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil detail lapangan");
    }
  },

  // Get fields by sport name (Futsal, MiniSoccer, Badminton, Padel)
  getFieldsBySport: async (sportName: string): Promise<FieldResponse> => {
    try {
      const response = await api.get(`/fields/sport/${sportName}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil lapangan berdasarkan olahraga");
    }
  },

  // Get field availability for a specific date
  getFieldAvailability: async (fieldId: string, date: string): Promise<FieldAvailabilityResponse> => {
    try {
      const response = await api.get(`/fields/${fieldId}/availability/${date}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil ketersediaan lapangan");
    }
  },
};

export default fieldApi;
