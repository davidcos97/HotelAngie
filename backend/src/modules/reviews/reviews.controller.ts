import type { Request, Response } from "express";
import * as reviewsService from "./reviews.service";

export async function listReviewsHandler(_req: Request, res: Response) {
  res.json(await reviewsService.listReviews());
}

export async function createReviewHandler(req: Request, res: Response) {
  res.status(201).json(await reviewsService.createReview(req.body));
}

export async function deleteReviewHandler(req: Request, res: Response) {
  await reviewsService.deleteReview(req.params.id!);
  res.status(204).send();
}
