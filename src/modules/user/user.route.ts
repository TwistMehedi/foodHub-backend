import express from "express";
import { authorizeRoles, middleware } from "../../middleware/middleware";
import {
  createCategory,
  getUsersByAdmin,
  me,
  updateUserStatusByAdmin,
} from "./user.controller";

const router = express.Router();

// admin route
router
  .route("/admin/create-category")
  .post(middleware, authorizeRoles("ADMIN"), createCategory);

router
  .route("/admin/users")
  .get(middleware, authorizeRoles("ADMIN"), getUsersByAdmin);

router
  .route("/admin/users/:id")
  .patch(middleware, authorizeRoles("ADMIN"), updateUserStatusByAdmin);

router
  .route("/admin/users/:id")
  .patch(middleware, authorizeRoles("ADMIN"), updateUserStatusByAdmin);

//user route
router.route("/user/me").get(middleware, me);

export const userRouter = router;
