import { z } from "zod";

export const verificationSchema = z
  .object({
    status: z.enum(["verified", "rejected"]),
    reason: z.string().trim().max(300).optional(),
  })
  .refine((v) => v.status !== "rejected" || (v.reason && v.reason.length >= 5), {
    message: "A reason (at least 5 characters) is required when rejecting",
    path: ["reason"],
  });