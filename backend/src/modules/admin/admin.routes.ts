import { Router } from "express";
import type { Request, Response } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import { verificationSchema } from "./admin.schemas";
import * as service from "./admin.service";

const router = Router();

// Every admin route requires a signed-in admin.
router.use(authenticate, authorize("admin"));

router.get("/tailors/pending", async (_req: Request, res: Response) => {
  res.json({ data: await service.listPending() });
});

router.patch("/tailors/:id/verification", validateBody(verificationSchema), async (req: Request, res: Response) => {
  const { status, reason } = req.body;
  res.json({ tailor: await service.setVerification(req.user!.id, String(req.params.id), status, reason) });
});

export default router;