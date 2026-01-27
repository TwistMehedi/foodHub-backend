import express from "express";
import { authorizeRoles, middleware } from "../../middleware/middleware";
import { createCategory } from "./user.controller";

const router = express.Router();

router
  .route("/create-category")
  .post(middleware, authorizeRoles("ADMIN"), createCategory);

export const userRouter = router;
