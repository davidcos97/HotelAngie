import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { createUserSchema } from "./users.schema";
import * as controller from "./users.controller";

const router = Router();

router.use(requireAuth, requireRole("ADMIN"));
router.get("/", asyncHandler(controller.listUsersHandler));
router.post("/", validateBody(createUserSchema), asyncHandler(controller.createUserHandler));
router.delete("/:id", asyncHandler(controller.deleteUserHandler));

export default router;
