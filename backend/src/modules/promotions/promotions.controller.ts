import type { Request, Response } from "express";
import * as promotionsService from "./promotions.service";

export async function listPromotionsHandler(_req: Request, res: Response) {
  res.json(await promotionsService.listPromotions());
}

export async function createPromotionHandler(req: Request, res: Response) {
  res.status(201).json(await promotionsService.createPromotion(req.body));
}

export async function deletePromotionHandler(req: Request, res: Response) {
  await promotionsService.deletePromotion(req.params.id!);
  res.status(204).send();
}
