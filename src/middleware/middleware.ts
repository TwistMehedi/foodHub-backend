import TryCatch from "../utils/TryCatch";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "../lib/prisma";
import { UserStatus } from "../../prisma/generated/prisma/enums";

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

// export const middleware = TryCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("Cookies:", req.headers.cookie);

//     const session = await auth.api.getSession({
//       headers: fromNodeHeaders(req.headers),
//     });

//     console.log(session);

//     if (!session) {
//       console.log("Session not found:", session);

//       return next(
//         new ErrorHandler("Please login to access this resource", 401),
//       );
//     }

//     req.user = {
//       id: session.user.id,
//       email: session.user.email,
//       role: session.user.role,
//     };

//     next();
//   },
// );

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionTokenRaw =
      req.cookies["better-auth.session_token"] ||
      req.cookies["__Secure-better-auth.session_token"] ||
      req.cookies["session_token"] ||
      req.cookies[".Tunnels.Relay.WebForwarding.Cookies"] ||
      req.cookies["tunnel_phishing_protection"] ||
      req.cookies["__next_hmr_refresh_hash__"];
 

    const sessionDataRaw =
      req.cookies["better-auth.session_data"] ||
      req.cookies["better-auth.session_token"] ||
      req.cookies["__Secure-better-auth.session_token"] ||
      req.cookies["__Secure-session_token"] ||
      req.cookies[".Tunnels.Relay.WebForwarding.Cookies"] ||
      req.cookies["tunnel_phishing_protection"] ||
      req.cookies["__next_hmr_refresh_hash__"];

    let sessionToken = "";

    if (sessionTokenRaw) {
      sessionToken = sessionTokenRaw.includes(".")
        ? sessionTokenRaw.split(".")[0]
        : sessionTokenRaw;
    } else if (sessionDataRaw) {
      try {
        const decodedData = Buffer.from(sessionDataRaw, "base64").toString(
          "utf-8",
        );
        const parsedData = JSON.parse(decodedData);

        const rawToken = parsedData.session?.token || parsedData.token;

        sessionToken = rawToken?.includes(".")
          ? rawToken.split(".")[0]
          : rawToken;
      } catch (err) {
        console.log("Decoding Error:", err);
      }
    }

    console.log("sessionToken middleware backend", sessionToken);
    if (!sessionToken) {
      return next(new ErrorHandler("Please login first", 401));
    }

    const sessionExists = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!sessionExists) {
      return next(new ErrorHandler("Session expired. Please login again", 401));
    }

    const user = sessionExists.user;

    if (
      
      user.status === UserStatus.SUSPENDED
    ) {
      return next(new ErrorHandler("Unauthorized! User not active", 401));
    }

    const now = new Date();
    const expiresAt = new Date(sessionExists.expiresAt);
    const createdAt = new Date(sessionExists.createdAt);
    const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
    const timeRemaining = expiresAt.getTime() - now.getTime();
    const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

    if (percentRemaining < 20) {
      res.setHeader("X-Session-Refresh", "true");
    }

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    return next();
  } catch (error) {
    console.log(" Auth Error:", error);
    return next(new ErrorHandler("Authentication failed", 401));
  }
};

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
