import axios from "axios";

// Base API configuration
const API_BASE_URL = "http://localhost:5000/api"; // Adjust this to your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Field interfaces
export interface Field {
  _id: string;
  name: string;
  pricePerHour: number;
  sport: {
    _id: string;
    sportName: string;
  };
  availability: Array<{
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
  }>;
  isActive: boolean;
  description?: string;
  facilities?: string[];
  location?: string;
  images?: string[];
}

export interface FieldResponse {
  status: number;
  data: Field[];
  message: string;
}

export interface Sport {
  _id: string;
  sportName: string;
  description?: string;
  maxPlayers?: number;
  minPlayers?: number;
}

export interface SportResponse {
  status: number;
  data: Sport[];
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
  getFieldById: async (fieldId: string): Promise<{ status: number; data: Field; message: string }> => {
    try {
      const response = await api.get(`/fields/${fieldId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil detail lapangan");
    }
  },

  // Get fields by sport
  getFieldsBySport: async (sportId: string): Promise<FieldResponse> => {
    try {
      const response = await api.get(`/fields?sport=${sportId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil lapangan berdasarkan olahraga");
    }
  },

  // Get all sports
  getAllSports: async (): Promise<SportResponse> => {
    try {
      const response = await api.get("/sports");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mengambil data olahraga");
    }
  },
};

// Fallback data for development (same as in Step2)
export const FALLBACK_FIELDS: Field[] = [
  {
    _id: "field1",
    name: "Mini Soccer",
    pricePerHour: 200000,
    sport: { _id: "sport1", sportName: "Mini Soccer" },
    availability: [
      { dayOfWeek: 0, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 1, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 2, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 3, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 4, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 5, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 6, openTime: "06:00", closeTime: "22:00" },
    ],
    isActive: true,
  },
  {
    _id: "field2",
    name: "Futsal",
    pricePerHour: 150000,
    sport: { _id: "sport2", sportName: "Futsal" },
    availability: [
      { dayOfWeek: 0, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 1, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 2, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 3, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 4, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 5, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 6, openTime: "06:00", closeTime: "22:00" },
    ],
    isActive: true,
  },
  {
    _id: "field3",
    name: "Badminton",
    pricePerHour: 50000,
    sport: { _id: "sport3", sportName: "Badminton" },
    availability: [
      { dayOfWeek: 0, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 1, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 2, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 3, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 4, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 5, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 6, openTime: "06:00", closeTime: "22:00" },
    ],
    isActive: true,
  },
  {
    _id: "field4",
    name: "Padel",
    pricePerHour: 130000,
    sport: { _id: "sport4", sportName: "Padel" },
    availability: [
      { dayOfWeek: 0, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 1, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 2, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 3, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 4, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 5, openTime: "06:00", closeTime: "22:00" },
      { dayOfWeek: 6, openTime: "06:00", closeTime: "22:00" },
    ],
    isActive: true,
  },
];

export default fieldApi;
