import { Router } from "express";

import { authorizeRoles, middleware } from "../../middleware/middleware";
import {
  getAdminStats,
  getDashboardStats,
  userStats,
} from "./stats.controller";

const router = Router();

router
  .route("/customer")
  .get(middleware, authorizeRoles("CUSTOMER"), userStats);

router
  .route("/all")
  .get(middleware, authorizeRoles("PROVIDER"), getDashboardStats);

router
  .route("/admin/all")
  .get(middleware, authorizeRoles("ADMIN"), getAdminStats);

export const statsRouter = router;
