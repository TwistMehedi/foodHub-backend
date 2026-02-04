import express from "express";
import { authorizeRoles, middleware } from "../../middleware/middleware";
import {
  createCategory,
  editProfile,
  getUsersByAdmin,
} from "./user.controller";

const router = express.Router();

router
  .route("/admin/create-category")
  .post(middleware, authorizeRoles("ADMIN"), createCategory);

router
  .route("/admin/users")
  .get(middleware, authorizeRoles("ADMIN"), getUsersByAdmin);

router
  .route("/profile-update")
  .put(
    middleware,
    authorizeRoles("ADMIN", "CUSTOMER", "PROVIDER"),
    editProfile,
  );

export const userRouter = router;
