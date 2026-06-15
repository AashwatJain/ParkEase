import mongoose from "mongoose";
import { User } from "./src/models/user.model.js";
import { Mall } from "./src/models/mall.model.js";

const seedGuard = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find any existing mall
    let mall = await Mall.findOne();

    if (!mall) {
      console.log("No mall found. Creating a dummy mall owner and mall...");
      const owner = await User.create({
        username: "dummyowner",
        email: "owner@test.com",
        password: "password123",
        role: "mall-owner"
      });

      mall = await Mall.create({
        name: "Phoenix Marketcity",
        address: "Pune",
        owner: owner._id,
        pricing: { bike: 10, car: 30 },
        status: "approved"
      });
      console.log("Dummy mall created:", mall._id);
    }

    // Check if guard exists
    const existingGuard = await User.findOne({ username: "testguard" });
    if (existingGuard) {
      console.log("Guard already exists. Assigned Mall:", existingGuard.assignedMall);
      process.exit(0);
    }

    // Create guard
    const guard = await User.create({
      username: "testguard",
      email: "guard@mall.com",
      password: "password123",
      role: "guard",
      assignedMall: mall._id
    });

    console.log("Successfully created test guard!");
    console.log("Username: testguard");
    console.log("Password: password123");
    console.log("Assigned Mall ID:", guard.assignedMall);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedGuard();
