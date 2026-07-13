import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/apiError";
import { generateBookingCode } from "@/utils/bookingCode";
import { bookingConfirmationEmail, sendMail } from "@/utils/mailer";
import { EXTRAS, TAX_RATE } from "./extras.data";
import type { CreateBookingInput } from "./bookings.schema";

function nightsBetween(checkIn: Date, checkOut: Date) {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function listBookings() {
  return prisma.booking.findMany({
    include: { room: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });
}

export async function createBooking(input: CreateBookingInput) {
  const room = await prisma.room.findUnique({ where: { id: input.roomId } });
  if (!room) throw ApiError.notFound("Habitación no encontrada");

  const checkIn = new Date(input.checkIn);
  const checkOut = new Date(input.checkOut);
  const nights = nightsBetween(checkIn, checkOut);

  if (Number.isNaN(nights) || nights < 1) {
    throw ApiError.badRequest("El rango de fechas no es válido");
  }

  const totalGuests = input.adults + input.children;
  if (totalGuests > room.capacityAdults + room.capacityChildren) {
    throw ApiError.badRequest("Esta habitación no tiene capacidad para esa cantidad de huéspedes");
  }

  const overlapping = await prisma.booking.findFirst({
    where: {
      roomId: room.id,
      status: "CONFIRMED",
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn }
    }
  });
  if (overlapping) throw ApiError.conflict("La habitación no está disponible en esas fechas");

  const roomTotal = room.pricePerNight * nights;
  const extrasTotal = input.extras.reduce((sum, id) => {
    const extra = EXTRAS.find((e) => e.id === id);
    if (!extra) return sum;
    let cost = extra.price;
    if (extra.perNight) cost *= nights;
    if (extra.perGuest) cost *= input.adults;
    return sum + cost;
  }, 0);

  const subtotal = roomTotal + extrasTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const code = generateBookingCode();

  const booking = await prisma.booking.create({
    data: {
      code,
      roomId: room.id,
      checkIn,
      checkOut,
      adults: input.adults,
      children: input.children,
      extras: input.extras,
      subtotal,
      tax,
      total,
      guestName: input.guest.name,
      guestEmail: input.guest.email,
      guestPhone: input.guest.phone,
      guestDocId: input.guest.docId,
      notes: input.guest.notes
    }
  });

  sendMail(
    input.guest.email,
    `Confirmación de reserva ${code} — 6/14 Co-Living`,
    bookingConfirmationEmail({
      guestName: input.guest.name,
      code,
      roomName: room.name,
      checkIn: checkIn.toDateString(),
      checkOut: checkOut.toDateString(),
      total
    })
  ).catch((err) => console.error("[mailer] Error enviando confirmación de reserva:", err));

  return booking;
}

export async function updateBookingStatus(id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED") {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw ApiError.notFound("Reserva no encontrada");
  return prisma.booking.update({ where: { id }, data: { status } });
}
