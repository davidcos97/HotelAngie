import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "@/utils/apiError";
import { env } from "@/config/env";

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({ message: "Datos inválidos", errors: err.flatten().fieldErrors });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({
    message: "Error interno del servidor",
    ...(env.nodeEnv === "development" && err instanceof Error ? { detail: err.message } : {})
  });
}
