import express from "express";
import { login, register, verifyEmail } from "./auth.controller";

const router = express.Router();

router.route("/register").post(register);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(login);

export const authRouter = router;
