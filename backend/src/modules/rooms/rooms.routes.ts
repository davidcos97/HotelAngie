import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { roomSchema, roomUpdateSchema } from "./rooms.schema";
import * as controller from "./rooms.controller";

const router = Router();

router.get("/", asyncHandler(controller.listRoomsHandler));
router.get("/slug/:slug", asyncHandler(controller.getRoomBySlugHandler));
router.get("/:id/availability", asyncHandler(controller.getAvailabilityHandler));
router.get("/:id", asyncHandler(controller.getRoomHandler));

router.post("/", requireAuth, requireRole("ADMIN", "STAFF"), validateBody(roomSchema), asyncHandler(controller.createRoomHandler));
router.put("/:id", requireAuth, requireRole("ADMIN", "STAFF"), validateBody(roomUpdateSchema), asyncHandler(controller.updateRoomHandler));
router.delete("/:id", requireAuth, requireRole("ADMIN"), asyncHandler(controller.deleteRoomHandler));

export default router;
