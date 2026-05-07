import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import TryCatch from "../../utils/TryCatch";
import { ErrorHandler } from "../../utils/ErrorHandler";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  callbackURL: z.string().optional(),
  rememberMe: z.boolean().optional(),
});

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
  callbackURL: z.string().optional(),
  rememberMe: z.boolean().optional(),
});

const socialGoogleSchema = z.object({
  callbackURL: z.string().optional(),
  disableRedirect: z.boolean().optional(),
  loginHint: z.string().optional(),
  additionalData: z.record(z.string(), z.any()).optional(),
});

const forwardToAuth = (path: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.url = path;
    next();
  };
};

const signIn = TryCatch(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    signInSchema.parse(req.body);
  } catch (error) {
    return next(new ErrorHandler("Invalid sign-in payload", 400));
  }
  req.url = "/sign-in/email";
  next();
});

const signUp = TryCatch(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    signUpSchema.parse(req.body);
  } catch (error) {
    return next(new ErrorHandler("Invalid sign-up payload", 400));
  }
  req.url = "/sign-up/email";
  next();
});

const socialGoogle = TryCatch(
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      socialGoogleSchema.parse(req.body);
    } catch (error) {
      return next(new ErrorHandler("Invalid Google social login payload", 400));
    }

    req.body = {
      ...req.body,
      provider: "google",
    };
    req.url = "/sign-in/social";
    next();
  },
);

const router = express.Router();

router.get("/get-session", forwardToAuth("/get-session"));
router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/sign-out", forwardToAuth("/sign-out"));
router.post("/social/google", socialGoogle);

export const authRouter = router;
