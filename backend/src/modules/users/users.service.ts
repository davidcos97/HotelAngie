import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/apiError";
import { hashPassword } from "@/utils/password";
import type { CreateUserInput } from "./users.schema";

export async function listUsers() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return users.map(({ password: _password, ...rest }) => rest);
}

export async function createUser(input: CreateUserInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw ApiError.conflict("Ya existe un usuario con ese correo");

  const password = await hashPassword(input.password);
  const user = await prisma.user.create({ data: { ...input, password } });
  const { password: _password, ...rest } = user;
  return rest;
}

export async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw ApiError.notFound("Usuario no encontrado");
  await prisma.user.delete({ where: { id } });
}
