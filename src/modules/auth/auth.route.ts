import express from "express";
import {
  login,
  logoutUser,
  me,
  register,
  verifyEmail,
} from "./auth.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/register").post(register);

router.route("/verify-email").get(verifyEmail);

router.route("/login").post(login);

router.route("/me").get(middleware, me);

router.route("/logout").get(middleware, logoutUser);

export const authRouter = router;
