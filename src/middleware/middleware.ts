import TryCatch from "../utils/TryCatch";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

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
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(
        new ErrorHandler("Please login to access this resource", 401),
      );
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    };

    next();
  },
);

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(new ErrorHandler("User role missing in request", 401));
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied for role '${userRole}'. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};
