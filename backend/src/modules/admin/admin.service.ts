import { AppError } from "../../utils/AppError";
import { isObjectId } from "../../utils/ObjectId";
import { TailorModel, toOwnerTailor } from "../tailors/tailor.model";
import { AuditLogModel } from "./auditLog.model";

export async function listPending() {
  const items = await TailorModel.find({ verificationStatus: "pending" })
    .sort({ createdAt: 1 })
    .populate("ownerUserId", "name email");

  return items.map((t) => {
    const owner = t.ownerUserId as unknown as { name?: string; email?: string } | null;
    return { ...toOwnerTailor(t), owner: { name: owner?.name, email: owner?.email } };
  });
}

export async function setVerification(
  adminId: string,
  tailorId: string,
  status: "verified" | "rejected",
  reason?: string
) {
  const tailor = isObjectId(tailorId) ? await TailorModel.findById(tailorId) : null;
  if (!tailor) throw new AppError(404, "NOT_FOUND", "Tailor not found");

  tailor.verificationStatus = status;
  tailor.rejectionReason = status === "rejected" ? reason : undefined;
  tailor.verifiedAt = status === "verified" ? new Date() : undefined;
  tailor.verifiedBy = status === "verified" ? (adminId as any) : undefined;
  await tailor.save();

  await AuditLogModel.create({
    actorId: adminId,
    action: `tailor.${status}`,
    targetType: "TailorProfile",
    targetId: tailor._id,
    meta: reason ? { reason } : undefined,
  });

  return toOwnerTailor(tailor);
}