import type { Request, Response } from "express";
import * as authService from "./auth.service";

export async function registerHandler(req: Request, res: Response) {
  const result = await authService.register(req.body);
  res.status(201).json(result);
}

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;
  res.json(await authService.login(email, password));
}

export async function meHandler(req: Request, res: Response) {
  res.json({ user: await authService.getCurrentUser(req.user!.id) });
}