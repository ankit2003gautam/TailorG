import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import { validateBody, validateQuery } from "../../middleware/validate";
import { createTailorSchema, listQuerySchema, updateTailorSchema } from "./tailor.schemas";
import { createHandler, getHandler, listHandler, meHandler, updateHandler } from "./tailor.controller";

const router = Router();

router.get("/", validateQuery(listQuerySchema), listHandler);
router.get("/me", authenticate, authorize("tailor"), meHandler); // must come before "/:id"
router.get("/:id", getHandler);
router.post("/", authenticate, authorize("tailor"), validateBody(createTailorSchema), createHandler);
router.patch("/:id", authenticate, authorize("tailor", "admin"), validateBody(updateTailorSchema), updateHandler);

export default router;