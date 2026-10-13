import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";

const tailorSchema = new Schema(
  {
    ownerUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    shopName: { type: String, required: true, trim: true, maxlength: 100 },
    about: { type: String, trim: true, maxlength: 1000, default: "" },
    address: { type: String, required: true, trim: true, maxlength: 200 },
    area: { type: String, required: true, trim: true, maxlength: 80 },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    specialisations: { type: [String], default: [] },
    categories: { type: [String], default: [] }, // category slugs
    hours: { type: String, trim: true, default: "" },
    homeMeasurement: { type: Boolean, default: false },
    startingPrice: { type: Number, min: 0, default: 0 }, // indicative, INR
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    rejectionReason: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tailorSchema.index({ location: "2dsphere" });
tailorSchema.index({ verificationStatus: 1, active: 1 });

export const TailorModel = model("TailorProfile", tailorSchema);
export type TailorDoc = HydratedDocument<InferSchemaType<typeof tailorSchema>>;

// What the public may see. No owner id, address, or verification details.
export function toPublicTailor(t: TailorDoc) {
  return {
    id: t.id as string,
    shopName: t.shopName,
    about: t.about,
    area: t.area,
    city: t.city,
    lat: t.location!.coordinates[1],
    lng: t.location!.coordinates[0],
    rating: t.rating,
    reviewCount: t.reviewCount,
    specialisations: t.specialisations,
    categories: t.categories,
    startingPrice: t.startingPrice,
    hours: t.hours,
    homeMeasurement: t.homeMeasurement,
  };
}

// What the owner and admins may see.
export function toOwnerTailor(t: TailorDoc) {
  return {
    ...toPublicTailor(t),
    address: t.address,
    verificationStatus: t.verificationStatus,
    rejectionReason: t.rejectionReason ?? undefined,
    active: t.active,
    createdAt: t.createdAt,
  };
}