import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/utils/jwt";
import { ApiError } from "@/utils/apiError";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Token no proporcionado");
  }

  try {
    const token = header.slice("Bearer ".length);
    req.user = verifyToken(token);
    next();
  } catch {
    throw ApiError.unauthorized("Token inválido o expirado");
  }
}

export function requireRole(...roles: Array<"ADMIN" | "STAFF">) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw ApiError.forbidden("No tienes permisos para esta acción");
    }
    next();
  };
}
