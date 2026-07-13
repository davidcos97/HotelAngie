import { prisma } from "@/config/prisma";
import { sendMail } from "@/utils/mailer";
import { env } from "@/config/env";
import type { ContactInput } from "./contact.schema";

export async function createContactMessage(input: ContactInput) {
  const message = await prisma.contactMessage.create({ data: input });

  sendMail(
    env.smtp.from,
    `Nuevo mensaje de contacto — ${input.subject}`,
    `<p><strong>${input.name}</strong> (${input.email} / ${input.phone})</p><p>${input.message}</p>`
  ).catch((err) => console.error("[mailer] Error enviando notificación de contacto:", err));

  return message;
}

export function listContactMessages() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}
