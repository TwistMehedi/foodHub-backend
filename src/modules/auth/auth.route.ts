import express from "express";
import { register, verifyEmail } from "./auth.controller";

const router = express.Router();

router.route("/register").post(register);
router.route("/verify-email").post(verifyEmail);

export const authRouter = router;
