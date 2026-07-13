import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { validateBody } from "@/middleware/validate.middleware";
import { requireAuth, requireRole } from "@/middleware/auth.middleware";
import { contactLimiter } from "@/middleware/rateLimit.middleware";
import { blogPostSchema, blogPostUpdateSchema, commentSchema } from "./blog.schema";
import * as controller from "./blog.controller";

const router = Router();

router.get("/", asyncHandler(controller.listPostsHandler));
router.get("/:slug", asyncHandler(controller.getPostHandler));
router.post("/:slug/comments", contactLimiter, validateBody(commentSchema), asyncHandler(controller.addCommentHandler));

router.post("/", requireAuth, requireRole("ADMIN", "STAFF"), validateBody(blogPostSchema), asyncHandler(controller.createPostHandler));
router.put("/:id", requireAuth, requireRole("ADMIN", "STAFF"), validateBody(blogPostUpdateSchema), asyncHandler(controller.updatePostHandler));
router.delete("/:id", requireAuth, requireRole("ADMIN"), asyncHandler(controller.deletePostHandler));

export default router;
