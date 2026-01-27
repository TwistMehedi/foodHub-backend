import envConfig from "../config/envConfig";
import TryCatch from "../utils/TryCatch";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email?: string;
      role?: string;
      [key: string]: any;
    };
  }
}

export const middleware = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return next(new ErrorHandler("No token provided", 401));
    }
    const decoded = jwt.verify(token, envConfig.jwt_secret as string);
    // console.log(decoded);
    req.user = {
      id: (decoded as any).userId,
      role: (decoded as any).role,
    };

    next();
  },
);
