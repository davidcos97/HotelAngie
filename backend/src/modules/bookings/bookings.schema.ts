import { z } from "zod";

export const guestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  docId: z.string().min(4),
  notes: z.string().optional()
});

export const createBookingSchema = z.object({
  roomId: z.string().min(1),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().int().min(1),
  children: z.number().int().min(0).default(0),
  extras: z.array(z.string()).default([]),
  guest: guestSchema
});

export const updateBookingSchema = z.object({
  status: z.enum(["CONFIRMED", "CANCELLED", "COMPLETED"])
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
