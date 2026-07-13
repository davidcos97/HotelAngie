import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5),
  roomId: z.string().optional(),
  photo: z.string().optional()
});

export type ReviewInput = z.infer<typeof reviewSchema>;
