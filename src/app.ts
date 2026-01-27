import express, { Application } from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middleware/errorMiddleware ";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(errorMiddleware);

export default app;
