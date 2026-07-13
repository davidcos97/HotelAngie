import type { Request, Response } from "express";
import { login } from "./auth.service";

export async function loginHandler(req: Request, res: Response) {
  const result = await login(req.body);
  res.json(result);
}
