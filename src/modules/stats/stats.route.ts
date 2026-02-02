import { Router } from "express";

import { authorizeRoles, middleware } from "../../middleware/middleware";
import { getAdminStats, getDashboardStats } from "./stats.controller";

const router = Router();

router
  .route("/stats/all")
  .get(middleware, authorizeRoles("PROVIDER"), getDashboardStats);

router
  .route("/admin/stats")
  .get(middleware, authorizeRoles("ADMIN"), getAdminStats);

export const statsRouter = router;
