import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
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
  bikeRatePerHour: number;
  carRatePerHour: number;
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
  mall: Mall | string;
  mallName?: string;
  vehicleType: "bike" | "car";
  vehicleNumber: string;
  slotNumber?: string;
  floorNumber?: number;
  entryTime: string;
  exitTime?: string;
  amount?: number;
  status: "active" | "completed";
  qrCode?: string;
  rated?: boolean;
}
