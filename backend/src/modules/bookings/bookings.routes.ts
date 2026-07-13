import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { createBookingSchema, updateBookingSchema } from "./bookings.schema";
import * as controller from "./bookings.controller";

const router = Router();

router.get("/", requireAuth, requireRole("ADMIN", "STAFF"), asyncHandler(controller.listBookingsHandler));
router.post("/", validateBody(createBookingSchema), asyncHandler(controller.createBookingHandler));
router.patch("/:id", requireAuth, requireRole("ADMIN", "STAFF"), validateBody(updateBookingSchema), asyncHandler(controller.updateBookingHandler));

export default router;
