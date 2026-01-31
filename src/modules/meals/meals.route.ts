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
  deleteCategory,
} from "./meals.controller";
import { authorizeRoles, middleware } from "../../middleware/middleware";

const router = express.Router();

router
  .route("/create-resturant")
  .post(middleware, authorizeRoles("ADMIN", "PROVIDER"), createResturant);
router.route("/provider/meals").post(middleware, createMeal);
router
  .route("/provider/meals/me")
  .get(middleware, authorizeRoles("ADMIN", "PROVIDER"), getMels);
router.route("/meals/:id").put(middleware, updateMeal);
router.route("/meals/:id").delete(middleware, deleteMeal);
router
  .route("/meals/delete/category/:id")
  .delete(middleware, authorizeRoles("ADMIN"), deleteCategory);

//pblic route
router.route("/meals").get(getAllMeals);
router.route("/meals/:id").get(getMealById);
router.route("/providers").get(getAllProvider);
router.route("/provider/:id").get(getProviderById);
router.route("/categories").get(getCategories);
router.route("/home/meals").get(getMealsInHome);

export const mealsRouter = router;
