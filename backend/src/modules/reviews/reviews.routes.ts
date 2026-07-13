import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { contactLimiter } from "@/middleware/rateLimit.middleware";
import { reviewSchema } from "./reviews.schema";
import * as controller from "./reviews.controller";

const router = Router();

router.get("/", asyncHandler(controller.listReviewsHandler));
router.post("/", contactLimiter, validateBody(reviewSchema), asyncHandler(controller.createReviewHandler));
router.delete("/:id", requireAuth, requireRole("ADMIN", "STAFF"), asyncHandler(controller.deleteReviewHandler));

export default router;
