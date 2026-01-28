import express from "express";
import {
  createMeal,
  createResturant,
  getMels,
  updateMeal,
} from "./meals.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/create-resturant").post(middleware, createResturant);
router.route("/meals").post(middleware, createMeal);
router.route("/meals").get(middleware, getMels);
router.route("/meals/:id").put(middleware, updateMeal);

export const mealsRouter = router;
