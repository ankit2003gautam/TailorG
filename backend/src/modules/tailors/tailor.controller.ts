import type { Request, Response } from "express";
import * as service from "./tailor.service";

export async function createHandler(req: Request, res: Response) {
  res.status(201).json({ tailor: await service.createTailor(req.user!.id, req.body) });
}

export async function meHandler(req: Request, res: Response) {
  res.json({ tailor: await service.getOwnTailor(req.user!.id) });
}

export async function listHandler(_req: Request, res: Response) {
  res.json(await service.listPublicTailors(res.locals.query));
}

export async function getHandler(req: Request, res: Response) {
  res.json({ tailor: await service.getPublicTailor(String(req.params.id)) });
}

export async function updateHandler(req: Request, res: Response) {
  res.json({ tailor: await service.updateTailor(String(req.params.id), req.user!, req.body) });
}