import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/config";
import { AppError } from "../utils/AppError";
import { UserModel } from "../modules/users/user.model";

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "UNAUTHENTICATED", "Please sign in");
  }

  let userId: string;
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET, { algorithms: ["HS256"] });
    userId = String(payload.sub);
  } catch {
    throw new AppError(401, "INVALID_TOKEN", "Your session is invalid or has expired");
  }

  // Load from the DB so role and status are always current, not trusted from the token.
  const user = await UserModel.findById(userId);
  if (!user || user.accountStatus !== "active") {
    throw new AppError(401, "UNAUTHENTICATED", "Account not available");
  }

  req.user = { id: user.id, role: user.role as "customer" | "tailor" | "admin" };
  next();
}

export const authorize =
  (...roles: Array<"customer" | "tailor" | "admin">) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, "FORBIDDEN", "You don't have permission to do this");
    }
    next();
  };