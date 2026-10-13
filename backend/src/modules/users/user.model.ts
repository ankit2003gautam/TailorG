import { Schema, model } from "mongoose";

export const USER_ROLES = ["customer", "tailor", "admin"] as const;
export type Role = (typeof USER_ROLES)[number];

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true, select: false }, // never returned by default
    role: { type: String, enum: USER_ROLES, default: "customer" },
    accountStatus: { type: String, enum: ["active", "suspended"], default: "active" },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);

export function toPublicUser(u: { id: string; name: string; email: string; phone?: string | null; role: string }) {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone ?? undefined, role: u.role as Role };
}