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
  .route("/create")
  .post(
    middleware,
    authorizeRoles("ADMIN", "PROVIDER"),
    upload.single("image"),
    createMeal,
  );

router
  .route("/provider/me")
  .get(middleware, authorizeRoles("ADMIN", "PROVIDER"), getMels);

router
  .route("/:id")
  .put(
    middleware,
    authorizeRoles("ADMIN", "PROVIDER"),
    upload.single("image"),
    updateMeal,
  );

router
  .route("/:id")
  .delete(middleware, authorizeRoles("ADMIN", "PROVIDER"), deleteMeal);

router
  .route("/category/delete/:id")
  .delete(middleware, authorizeRoles("ADMIN"), deleteCategory);

router.route("/categories").get(getCategories);
router.route("/home").get(getMealsInHome);

router.route("/").get(getAllMeals);
router.route("/:id").get(getMealById);
router.route("/providers").get(getAllProvider);
router.route("/provider/:id").get(getProviderById);

export const mealsRouter = router;
