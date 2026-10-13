import { z } from "zod";

const fields = {
  shopName: z.string().trim().min(2).max(100),
  about: z.string().trim().max(1000).optional(),
  address: z.string().trim().min(5).max(200),
  area: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(80),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  specialisations: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
  categories: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(10).optional(),
  hours: z.string().trim().max(100).optional(),
  homeMeasurement: z.boolean().optional(),
  startingPrice: z.number().int().min(0).max(1_000_000).optional(),
};

export const createTailorSchema = z.object(fields);

export const updateTailorSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "Send at least one field to update" })
  .refine((v) => (v.lat === undefined) === (v.lng === undefined), {
    message: "Send lat and lng together",
    path: ["lat"],
  });

export const listQuerySchema = z.object({
  q: z.string().trim().max(80).optional(),
  category: z.string().regex(/^[a-z0-9-]+$/).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  homeOnly: z.enum(["true", "false"]).optional().transform((v) => v === "true"),
  sort: z.enum(["recommended", "rating", "price"]).default("recommended"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export type CreateTailorInput = z.infer<typeof createTailorSchema>;
export type UpdateTailorInput = z.infer<typeof updateTailorSchema>;
export type ListQuery = z.infer<typeof listQuerySchema>;