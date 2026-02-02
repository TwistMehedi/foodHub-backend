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
  getResturant,
} from "./meals.controller";
import { authorizeRoles, middleware } from "../../middleware/middleware";
import upload from "../../middleware/multer";

const router = express.Router();

router
  .route("/create-resturant")
  .post(
    middleware,
    authorizeRoles("ADMIN", "PROVIDER"),
    upload.single("image"),
    createResturant,
  );

router
  .route("/get-resturant")
  .get(middleware, authorizeRoles("ADMIN", "PROVIDER"), getResturant);

router
  .route("/provider/meals")
  .post(middleware, upload.single("image"), createMeal);
router
  .route("/provider/meals/me")
  .get(middleware, authorizeRoles("ADMIN", "PROVIDER"), getMels);
router
  .route("/meals/:id")
  .put(
    middleware,
    authorizeRoles("ADMIN", "PROVIDER"),
    upload.single("image"),
    updateMeal,
  );
router
  .route("/meals/:id")
  .delete(middleware, authorizeRoles("ADMIN", "PROVIDER"), deleteMeal);
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
