import express from "express";
import {
  createMeal,
  createResturant,
  deleteMeal,
  getAllMels,
  getMealById,
  getMels,
  updateMeal,
  getAllProvider,
  getProviderById,
} from "./meals.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/create-resturant").post(middleware, createResturant);
router.route("/provider/meals").post(middleware, createMeal);
router.route("/meals/me").get(middleware, getMels);
router.route("/meals/:id").put(middleware, updateMeal);
router.route("/meals/:id").delete(middleware, deleteMeal);

//pblic route
router.route("/meals").get(getAllMels);
router.route("/meals/:id").get(getMealById);
router.route("/providers").get(getAllProvider);
router.route("/providers/:id").get(getProviderById);

export const mealsRouter = router;
