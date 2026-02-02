import { Router } from "express";

import { authorizeRoles, middleware } from "../../middleware/middleware";
import { getAdminStats, getDashboardStats } from "./stats.controller";

const router = Router();

router
  .route("/all")
  .get(middleware, authorizeRoles("PROVIDER"), getDashboardStats);

router
  .route("/admin/all")
  .get(middleware, authorizeRoles("ADMIN"), getAdminStats);

export const statsRouter = router;
