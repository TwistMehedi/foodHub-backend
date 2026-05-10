import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRouter } from "./modules/user/user.route";
import { mealsRouter } from "./modules/meals/meals.route";
import { orderRouter } from "./modules/order/order.route";
import { statsRouter } from "./modules/stats/stats.route";
import { authRouter } from "./modules/auth/auth.route";
import { errorMiddleware } from "./middleware/errorMiddleware";
import envConfig from "./config/envConfig";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { reviewRouter } from "./modules/review/review.route";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// app.options("*", cors());

app.use(
  cors({
    origin: [envConfig.app_url as string],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/order", orderRouter);
app.use("/api/stats", statsRouter);
app.use("/api/review", reviewRouter);

app.use(errorMiddleware);
app.use(notFound);

export default app;
