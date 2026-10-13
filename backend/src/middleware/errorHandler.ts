import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: { code: "NOT_FOUND", message: `Route ${req.method} ${req.path} not found` } });
}

// Consistent error shape: { error: { code, message, details? } }
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, ...(err.details ? { details: err.details } : {}) },
    });
  }
  // Malformed JSON body
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: { code: "BAD_JSON", message: "Request body is not valid JSON" } });
  }
  // Avoid logging error payloads that may contain credentials or personal data.
  console.error("Unhandled API error", err instanceof Error ? err.name : "UnknownError");
  res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong" } });
}