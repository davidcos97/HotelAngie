import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export interface JwtPayload {
  sub: string;
  email: string;
  role: "ADMIN" | "STAFF";
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}
