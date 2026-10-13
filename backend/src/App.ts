import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/config";
import { errorHandler, notFound } from "./middleware/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import tailorRoutes from "./modules/tailors/tailor.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

if (env.NODE_ENV === "production") app.set("trust proxy", 1); // needed behind a host's proxy for rate limiting

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);
// ...after app.use("/api/auth", authRoutes);
app.use("/api/tailors", tailorRoutes);
app.use("/api/admin", adminRoutes);

export default app;