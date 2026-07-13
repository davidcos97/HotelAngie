import nodemailer from "nodemailer";
import { env } from "@/config/env";

const transporter = env.smtp.host
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass }
    })
  : null;

export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  if (!transporter) {
    console.warn(`[mailer] SMTP no configurado — correo a ${to} no enviado ("${subject}").`);
    return;
  }
  await transporter.sendMail({ from: env.smtp.from, to, subject, html });
}

export function bookingConfirmationEmail(params: {
  guestName: string;
  code: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  total: number;
}) {
  const { guestName, code, roomName, checkIn, checkOut, total } = params;
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color:#B8860B;">¡Gracias por tu reserva, ${guestName}!</h2>
      <p>Tu reserva en <strong>6/14 Co-Living</strong> ha sido confirmada.</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding:6px 0;color:#666;">Código</td><td style="padding:6px 0;font-weight:600;">${code}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Habitación</td><td style="padding:6px 0;">${roomName}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Check-in</td><td style="padding:6px 0;">${checkIn}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Check-out</td><td style="padding:6px 0;">${checkOut}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Total</td><td style="padding:6px 0;font-weight:600;">$${total.toLocaleString("es-CO")} COP</td></tr>
      </table>
      <p style="margin-top:24px;">Nos vemos pronto.</p>
    </div>
  `;
}
