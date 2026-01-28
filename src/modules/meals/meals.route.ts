import express from "express";
import { createMeal, createResturant, getMels } from "./meals.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/create-resturant").post(middleware, createResturant);
router.route("/meals").post(middleware, createMeal);
router.route("/meals").get(middleware, getMels);

export const mealsRouter = router;
