import { prisma } from "@/config/prisma";
import { comparePassword } from "@/utils/password";
import { signToken } from "@/utils/jwt";
import { ApiError } from "@/utils/apiError";
import type { LoginInput } from "./auth.schema";

export async function login({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ApiError.unauthorized("Credenciales incorrectas");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw ApiError.unauthorized("Credenciales incorrectas");

  const token = signToken({ sub: user.id, email: user.email, role: user.role });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  };
}
