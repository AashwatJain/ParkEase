import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use((response) => {
  if (response.data && response.data.data) {
    response.data = response.data.data;
  }
  return response;
});

export type Role = "user" | "mall-owner" | "admin";

export interface User {
  _id: string;
  id?: string;
  username: string;
  email: string;
  role: Role;
  isBanned?: boolean;
}

export interface Mall {
  _id: string;
  name: string;
  address?: string;
  city: string;
  pricing?: {
    bike: number;
    car: number;
  };
  status?: "pending" | "approved" | "rejected";
  averageRating?: number;
  owner?: { _id: string; username: string; email: string } | string;
  rejectionReason?: string;
}

export interface Floor {
  _id: string;
  floorNumber: number;
  bikeSlots: number;
  carSlots: number;
  bikeAvailable?: number;
  carAvailable?: number;
}

export interface Booking {
  _id: string;
  mall: Mall | { _id: string; name?: string; city?: string } | string;
  vehicleType: "bike" | "car";
  vehicleNumber: string;
  slot?: { _id: string; slotNumber: string } | string;
  floor?: { _id: string; floorNumber: number } | string;
  entryTime: string;
  exitTime?: string;
  fare?: number;
  status: "active" | "completed";
  qrCode?: string;
  isRated?: boolean;
}
