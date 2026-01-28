import express from "express";
import { createMeal, createResturant } from "./meals.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/create-resturant").post(middleware, createResturant);
router.route("/meals").post(middleware, createMeal);

export const mealsRouter = router;
