import { AppError } from "../../utils/AppError";
import { isObjectId } from "../../utils/ObjectId"; 
import { TailorModel, toOwnerTailor, toPublicTailor } from "./tailor.model";
import type { CreateTailorInput, ListQuery, UpdateTailorInput } from "./tailor.schemas";

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type TailorFilter = Record<string, any>;

export async function createTailor(ownerId: string, input: CreateTailorInput) {
  const { lat, lng, ...rest } = input;
  try {
    const tailor = await TailorModel.create({
      ...rest,
      ownerUserId: ownerId,
      location: { type: "Point", coordinates: [lng, lat] },
    });
    return toOwnerTailor(tailor);
  } catch (err: any) {
    if (err?.code === 11000) throw new AppError(409, "PROFILE_EXISTS", "You already have a shop profile");
    throw err;
  }
}

export async function getOwnTailor(ownerId: string) {
  const tailor = await TailorModel.findOne({ ownerUserId: ownerId });
  if (!tailor) throw new AppError(404, "NO_PROFILE", "You haven't created a shop profile yet");
  return toOwnerTailor(tailor);
}

export async function listPublicTailors(q: ListQuery) {
  // Business rule: only verified and active shops appear publicly.
  const filter: TailorFilter = { verificationStatus: "verified", active: true };

  if (q.q) {
    const rx = new RegExp(escapeRegex(q.q), "i"); // escaped, so user input can't inject patterns
    filter.$or = [{ shopName: rx }, { area: rx }, { specialisations: rx }];
  }
  if (q.category) filter.categories = q.category;
  if (q.minRating) filter.rating = { $gte: q.minRating };
  if (q.maxPrice) filter.startingPrice = { $lte: q.maxPrice };
  if (q.homeOnly) filter.homeMeasurement = true;

  const sortBy: Record<string, 1 | -1> =
    q.sort === "price"
      ? { startingPrice: 1, _id: 1 }
      : { rating: -1, reviewCount: -1, _id: 1 };

  const [items, total] = await Promise.all([
    TailorModel.find(filter)
      .sort(sortBy)
      .skip((q.page - 1) * q.limit)
      .limit(q.limit),
    TailorModel.countDocuments(filter),
  ]);

  return {
    data: items.map(toPublicTailor),
    page: q.page,
    limit: q.limit,
    total,
    totalPages: Math.ceil(total / q.limit),
  };
}

export async function getPublicTailor(id: string) {
  const tailor = isObjectId(id)
    ? await TailorModel.findOne({ _id: id, verificationStatus: "verified", active: true })
    : null;
  if (!tailor) throw new AppError(404, "NOT_FOUND", "Tailor not found");
  return toPublicTailor(tailor);
}

export async function updateTailor(id: string, actor: { id: string; role: string }, input: UpdateTailorInput) {
  const tailor = isObjectId(id) ? await TailorModel.findById(id) : null;
  if (!tailor) throw new AppError(404, "NOT_FOUND", "Tailor not found");

  // Ownership is enforced here on the server, whatever the frontend shows.
  const isOwner = tailor.ownerUserId.toString() === actor.id;
  if (!isOwner && actor.role !== "admin") {
    throw new AppError(403, "FORBIDDEN", "You can only edit your own shop");
  }

  const { lat, lng, ...rest } = input;
  Object.assign(tailor, rest);
  if (lat !== undefined && lng !== undefined) {
    tailor.location = { type: "Point", coordinates: [lng, lat] };
  }

  // Owner fixes a rejected profile -> back into the verification queue.
  if (isOwner && tailor.verificationStatus === "rejected") {
    tailor.verificationStatus = "pending";
    tailor.rejectionReason = undefined;
  }

  await tailor.save();
  return toOwnerTailor(tailor);
}