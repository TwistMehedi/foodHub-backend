import { Router } from "express";
import {
  createOrder,
  getOrderByCustomer,
  getOrderByProvider,
  singleOrder,
  singleOrderByProvider,
  updateOrderStatus,
} from "./order.controller";
import { authorizeRoles, middleware } from "../../middleware/middleware";

const router = Router();

router.route("/order/create").post(middleware, createOrder);
router.route("/order/get/me").get(middleware, getOrderByCustomer);
router
  .route("/order/get/me/provider")
  .get(middleware, authorizeRoles("PROVIDER"), getOrderByProvider);
router.route("/order/single/:id").get(middleware, singleOrder);
router
  .route("/order/provider/:id")
  .get(middleware, authorizeRoles("PROVIDER"), singleOrderByProvider);

router
  .route("/order/status/:id")
  .patch(middleware, authorizeRoles("PROVIDER"), updateOrderStatus);

export const orderRouter = router;
