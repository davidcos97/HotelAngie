import { prisma } from "@/config/prisma";

export async function getDashboardStats() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalRooms, activeBookings, monthBookings] = await Promise.all([
    prisma.room.count(),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.findMany({ where: { status: { in: ["CONFIRMED", "COMPLETED"] }, createdAt: { gte: monthStart } } })
  ]);

  const monthRevenue = monthBookings.reduce((sum, b) => sum + b.total, 0);

  const totalRoomNights = totalRooms * 30;
  const bookedNights = monthBookings.reduce((sum, b) => {
    const nights = Math.round((b.checkOut.getTime() - b.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return sum + nights;
  }, 0);
  const occupancyRate = totalRoomNights > 0 ? Math.min(100, Math.round((bookedNights / totalRoomNights) * 100)) : 0;

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const bookingsByDay = await Promise.all(
    days.map(async (day) => {
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const count = await prisma.booking.count({ where: { createdAt: { gte: start, lt: end } } });
      return { day: start.toLocaleDateString("es-CO", { weekday: "short" }), count };
    })
  );

  return { totalRooms, activeBookings, monthRevenue, occupancyRate, bookingsByDay };
}
