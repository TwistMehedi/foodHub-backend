import express from "express";
import { createReview } from "./review.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/").post(middleware, createReview);

export const reviewRouter = router;
