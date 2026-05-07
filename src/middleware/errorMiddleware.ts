import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import envConfig from "../config/envConfig";

export const errorMiddleware = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error caught by middleware:", err);

  const statusCode = err instanceof ErrorHandler ? err.statusCode : 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(envConfig.node_env === "development" && {
      stack: err.stack,
    }),
  });
};
