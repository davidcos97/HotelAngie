import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { contactLimiter } from "@/middleware/rateLimit.middleware";
import { contactSchema } from "./contact.schema";
import * as controller from "./contact.controller";

const router = Router();

router.post("/", contactLimiter, validateBody(contactSchema), asyncHandler(controller.createContactHandler));
router.get("/", requireAuth, requireRole("ADMIN", "STAFF"), asyncHandler(controller.listContactHandler));

export default router;
