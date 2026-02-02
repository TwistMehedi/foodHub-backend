import { Router } from "express";
import {
  allOrdersForAdmin,
  createOrder,
  getOrderByCustomer,
  getOrderByProvider,
  singleOrder,
  singleOrderByProvider,
  updateOrderStatus,
} from "./order.controller";
import { authorizeRoles, middleware } from "../../middleware/middleware";

const router = Router();

router.route("/create").post(middleware, createOrder);

router.route("/me").get(middleware, getOrderByCustomer);

router
  .route("/me/provider")
  .get(middleware, authorizeRoles("PROVIDER"), getOrderByProvider);

router.route("/:id").get(middleware, singleOrder);

router
  .route("/provider/for/:id")
  .get(middleware, authorizeRoles("PROVIDER"), singleOrderByProvider);

router
  .route("/status/:id")
  .patch(middleware, authorizeRoles("PROVIDER"), updateOrderStatus);

router
  .route("/admin/orders")
  .get(middleware, authorizeRoles("ADMIN"), allOrdersForAdmin);

export const orderRouter = router;
