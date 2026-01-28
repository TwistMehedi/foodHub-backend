import { Router } from "express";
import { createOrder } from "./order.controller";
import { middleware } from "../../middleware/middleware";

const router = Router();

router.route("/").post(middleware, createOrder);

export const orderRouter = router;
