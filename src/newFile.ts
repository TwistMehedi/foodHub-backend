import cors from "cors";
import { app } from "./app";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
