import express, { Application } from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middleware/errorMiddleware ";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

export default app;
