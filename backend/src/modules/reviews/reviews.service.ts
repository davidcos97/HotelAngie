import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/apiError";
import type { ReviewInput } from "./reviews.schema";

export function listReviews() {
  return prisma.review.findMany({ orderBy: { date: "desc" } });
}

export function createReview(input: ReviewInput) {
  return prisma.review.create({ data: input });
}

export async function deleteReview(id: string) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw ApiError.notFound("Opinión no encontrada");
  await prisma.review.delete({ where: { id } });
}
