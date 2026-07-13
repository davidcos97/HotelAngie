import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/apiError";
import type { RoomInput } from "./rooms.schema";

export function listRooms() {
  return prisma.room.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getRoomById(id: string) {
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) throw ApiError.notFound("Habitación no encontrada");
  return room;
}

export async function getRoomBySlug(slug: string) {
  const room = await prisma.room.findUnique({ where: { slug } });
  if (!room) throw ApiError.notFound("Habitación no encontrada");
  return room;
}

export async function createRoom(input: RoomInput) {
  const existing = await prisma.room.findUnique({ where: { slug: input.slug } });
  if (existing) throw ApiError.conflict("Ya existe una habitación con ese slug");
  return prisma.room.create({ data: input });
}

export async function updateRoom(id: string, input: Partial<RoomInput>) {
  await getRoomById(id);
  return prisma.room.update({ where: { id }, data: input });
}

export async function deleteRoom(id: string) {
  await getRoomById(id);
  await prisma.room.delete({ where: { id } });
}

export async function getRoomAvailability(id: string, month: string) {
  await getRoomById(id);

  const [year, monthNum] = month.split("-").map(Number);
  const start = new Date(year!, monthNum! - 1, 1);
  const end = new Date(year!, monthNum!, 0);

  const bookings = await prisma.booking.findMany({
    where: {
      roomId: id,
      status: "CONFIRMED",
      checkIn: { lte: end },
      checkOut: { gte: start }
    }
  });

  const unavailable = new Set<string>();
  for (const booking of bookings) {
    const cursor = new Date(Math.max(booking.checkIn.getTime(), start.getTime()));
    const bookingEnd = new Date(Math.min(booking.checkOut.getTime(), end.getTime()));
    while (cursor <= bookingEnd) {
      unavailable.add(cursor.toISOString().split("T")[0]!);
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return Array.from(unavailable);
}
