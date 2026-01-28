import express from "express";
import { authorizeRoles, middleware } from "../../middleware/middleware";
import {
  createCategory,
  getUsersByAdmin,
  updateUserStatusByAdmin,
} from "./user.controller";

const router = express.Router();

router
  .route("/create-category")
  .post(middleware, authorizeRoles("ADMIN"), createCategory);

router
  .route("/users")
  .get(middleware, authorizeRoles("ADMIN"), getUsersByAdmin);

router
  .route("/users/:id")
  .patch(middleware, authorizeRoles("ADMIN"), updateUserStatusByAdmin);

export const userRouter = router;
