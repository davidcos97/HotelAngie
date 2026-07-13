import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { env } from "@/config/env";
import { generalLimiter } from "@/middleware/rateLimit.middleware";
import { errorMiddleware, notFoundMiddleware } from "@/middleware/error.middleware";

import authRoutes from "@/modules/auth/auth.routes";
import roomsRoutes from "@/modules/rooms/rooms.routes";
import bookingsRoutes from "@/modules/bookings/bookings.routes";
import blogRoutes from "@/modules/blog/blog.routes";
import contactRoutes from "@/modules/contact/contact.routes";
import reviewsRoutes from "@/modules/reviews/reviews.routes";
import promotionsRoutes from "@/modules/promotions/promotions.routes";
import usersRoutes from "@/modules/users/users.routes";
import adminRoutes from "@/modules/admin/admin.routes";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));
  app.use(generalLimiter);

  app.get("/health", (_req, res) => res.json({ status: "ok", service: "6/14 Co-Living API" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/rooms", roomsRoutes);
  app.use("/api/bookings", bookingsRoutes);
  app.use("/api/blog", blogRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/reviews", reviewsRoutes);
  app.use("/api/promotions", promotionsRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
