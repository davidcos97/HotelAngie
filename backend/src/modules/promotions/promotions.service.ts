import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/apiError";
import type { PromotionInput } from "./promotions.schema";

export function listPromotions() {
  return prisma.promotion.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPromotion(input: PromotionInput) {
  const existing = await prisma.promotion.findUnique({ where: { code: input.code } });
  if (existing) throw ApiError.conflict("Ya existe una promoción con ese código");
  return prisma.promotion.create({ data: { ...input, validUntil: new Date(input.validUntil) } });
}

export async function deletePromotion(id: string) {
  const promo = await prisma.promotion.findUnique({ where: { id } });
  if (!promo) throw ApiError.notFound("Promoción no encontrada");
  await prisma.promotion.delete({ where: { id } });
}
