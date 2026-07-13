import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "El slug solo puede contener minúsculas, números y guiones"),
  shortDescription: z.string().min(5),
  description: z.string().min(10),
  pricePerNight: z.number().int().positive(),
  currency: z.enum(["COP", "USD"]).default("COP"),
  capacityAdults: z.number().int().min(1),
  capacityChildren: z.number().int().min(0).default(0),
  beds: z.number().int().min(1),
  sizeM2: z.number().int().positive(),
  view: z.string().optional().default(""),
  amenities: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  video: z.string().optional(),
  featured: z.boolean().optional().default(false)
});

export const roomUpdateSchema = roomSchema.partial();

export type RoomInput = z.infer<typeof roomSchema>;
