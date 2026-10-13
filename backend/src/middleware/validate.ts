import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utils/AppError";

function parse(schema: ZodType, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const details = result.error.issues.map((i) => ({ field: i.path.join("."), message: i.message }));
    throw new AppError(400, "VALIDATION_ERROR", "Invalid input", details);
  }
  return result.data;
}

export const validateBody = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
  req.body = parse(schema, req.body); // only validated, stripped data continues
  next();
};

export const validateQuery = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  res.locals.query = parse(schema, req.query);
  next();
};