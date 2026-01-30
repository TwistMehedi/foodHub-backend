import express, { Application } from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middleware/errorMiddleware ";
import { authRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { userRouter } from "./modules/user/user.route";
import { mealsRouter } from "./modules/meals/meals.route";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/admin", userRouter);
app.use("/api", mealsRouter);

app.use(errorMiddleware);

export default app;
