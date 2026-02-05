import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRouter } from "./modules/user/user.route";
import { mealsRouter } from "./modules/meals/meals.route";
import { orderRouter } from "./modules/order/order.route";
import { statsRouter } from "./modules/stats/stats.route";
import { errorMiddleware } from "./middleware/errorMiddleware ";
import envConfig from "./config/envConfig";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { reviewRouter } from "./modules/review/review.route";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: envConfig.app_url,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/user", userRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/order", orderRouter);
app.use("/api/stats", statsRouter);
app.use("/api/review", reviewRouter);

app.use(errorMiddleware);

export default app;
