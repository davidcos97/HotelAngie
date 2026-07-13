import { z } from "zod";

export const promotionSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  discount: z.string().min(1),
  code: z.string().min(3),
  validUntil: z.string(),
  image: z.string().optional()
});

export type PromotionInput = z.infer<typeof promotionSchema>;
