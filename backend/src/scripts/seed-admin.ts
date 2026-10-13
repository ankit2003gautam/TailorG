import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDb } from "../config/db";
import { UserModel } from "../modules/users/user.model";

async function run() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Platform Admin";

  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env");
  }

  await connectDb();
  const existing = await UserModel.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
  } else {
    await UserModel.create({ name, email, passwordHash: await bcrypt.hash(password, 12), role: "admin" });
    console.log("Admin created:", email);
  }
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});