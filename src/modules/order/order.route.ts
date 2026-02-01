import { Router } from "express";
import {
  createOrder,
  getOrderByCustomer,
  singleOrder,
} from "./order.controller";
import { middleware } from "../../middleware/middleware";

const router = Router();

router.route("/order/create").post(middleware, createOrder);
router.route("/order/get/me").get(middleware, getOrderByCustomer);
router.route("/order/single/:id").get(middleware, singleOrder);

export const orderRouter = router;
