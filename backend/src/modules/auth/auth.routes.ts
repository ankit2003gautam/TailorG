import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticate } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./auth.schemas";
import { loginHandler, meHandler, registerHandler } from "./auth.controller";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." } },
});

const router = Router();

router.post("/register", authLimiter, validateBody(registerSchema), registerHandler);
router.post("/login", authLimiter, validateBody(loginSchema), loginHandler);
router.get("/me", authenticate, meHandler);

export default router;