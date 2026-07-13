import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { promotionSchema } from "./promotions.schema";
import * as controller from "./promotions.controller";

const router = Router();

router.get("/", asyncHandler(controller.listPromotionsHandler));
router.post("/", requireAuth, requireRole("ADMIN", "STAFF"), validateBody(promotionSchema), asyncHandler(controller.createPromotionHandler));
router.delete("/:id", requireAuth, requireRole("ADMIN"), asyncHandler(controller.deletePromotionHandler));

export default router;
