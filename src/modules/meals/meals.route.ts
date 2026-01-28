import express from "express";
import {
  createMeal,
  createResturant,
  deleteMeal,
  getMels,
  updateMeal,
} from "./meals.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/create-resturant").post(middleware, createResturant);
router.route("/meals").post(middleware, createMeal);
router.route("/meals").get(middleware, getMels);
router.route("/meals/:id").put(middleware, updateMeal);
router.route("/meals/:id").delete(middleware, deleteMeal);

export const mealsRouter = router;
