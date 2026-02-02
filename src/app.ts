import express, { Application } from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middleware/errorMiddleware ";
import { authRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { userRouter } from "./modules/user/user.route";
import { mealsRouter } from "./modules/meals/meals.route";
import cors from "cors";
import { orderRouter } from "./modules/order/order.route";
import { statsRouter } from "./modules/stats/stats.route";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/meals", mealsRouter);

app.use("/api/order", orderRouter);

app.use("/api/stats", statsRouter);

app.use(errorMiddleware);

export default app;
