import type { Request, Response } from "express";
import * as bookingsService from "./bookings.service";

export async function listBookingsHandler(_req: Request, res: Response) {
  const bookings = await bookingsService.listBookings();
  res.json(
    bookings.map((b) => ({
      id: b.id,
      code: b.code,
      guestName: b.guestName,
      roomName: b.room.name,
      checkIn: b.checkIn.toISOString().split("T")[0],
      checkOut: b.checkOut.toISOString().split("T")[0],
      total: b.total,
      status: b.status
    }))
  );
}

export async function createBookingHandler(req: Request, res: Response) {
  const booking = await bookingsService.createBooking(req.body);
  res.status(201).json({ code: booking.code, id: booking.id, total: booking.total });
}

export async function updateBookingHandler(req: Request, res: Response) {
  const booking = await bookingsService.updateBookingStatus(req.params.id!, req.body.status);
  res.json(booking);
}
