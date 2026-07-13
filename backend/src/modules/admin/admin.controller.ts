import type { Request, Response } from "express";
import * as adminService from "./admin.service";

export async function getStatsHandler(_req: Request, res: Response) {
  res.json(await adminService.getDashboardStats());
}
