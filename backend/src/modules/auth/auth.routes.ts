import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { authLimiter } from "@/middleware/rateLimit.middleware";
import { loginSchema } from "./auth.schema";
import { loginHandler } from "./auth.controller";

const router = Router();

router.post("/login", authLimiter, validateBody(loginSchema), asyncHandler(loginHandler));

export default router;
