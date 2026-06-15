import mongoose from "mongoose";
import { Booking } from "./src/models/booking.model.js";
import "./src/models/user.model.js";

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const bookings = await Booking.find({ status: "active" }).populate("user", "email");
  console.log("Active Bookings count:", bookings.length);
  bookings.forEach(b => {
    console.log(`- Booking ID: ${b._id}, User: ${b.user?.email}, Vehicle: ${b.vehicleNumber}`);
  });
  
  // Also clear all active bookings
  const { Slot } = await import("./src/models/slot.model.js");
  await Slot.updateMany({ status: "occupied" }, { status: "available" });
  console.log("Freed all slots.");
  process.exit(0);
}
run();
