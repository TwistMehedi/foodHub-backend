import express from "express";
import {
  createMeal,
  createResturant,
  deleteMeal,
  getAllMeals,
  getMealById,
  getMels,
  updateMeal,
  getAllProvider,
  getProviderById,
  getCategories,
  getMealsInHome,
} from "./meals.controller";
import { middleware } from "../../middleware/middleware";

const router = express.Router();

router.route("/create-resturant").post(middleware, createResturant);
router.route("/provider/meals").post(middleware, createMeal);
router.route("/meals/me").get(middleware, getMels);
router.route("/meals/:id").put(middleware, updateMeal);
router.route("/meals/:id").delete(middleware, deleteMeal);

//pblic route
router.route("/meals").get(getAllMeals);
router.route("/meals/:id").get(getMealById);
router.route("/providers").get(getAllProvider);
router.route("/provider/:id").get(getProviderById);
router.route("/categories").get(getCategories);
router.route("/home/meals").get(getMealsInHome);

export const mealsRouter = router;
