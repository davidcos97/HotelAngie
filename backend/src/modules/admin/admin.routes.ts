import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { getStatsHandler } from "./admin.controller";

const router = Router();

router.get("/stats", requireAuth, requireRole("ADMIN", "STAFF"), asyncHandler(getStatsHandler));

export default router;
