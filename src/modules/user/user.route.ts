import express from "express";
import { authorizeRoles, middleware } from "../../middleware/middleware";
import {
  createCategory,
  editProfile,
  getUsersByAdmin,
  loginUser,
} from "./user.controller";

const router = express.Router();
router
  .route("/login")
  .get((req, res) => {
    res.send("Working");
  })
  .post(loginUser);
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
