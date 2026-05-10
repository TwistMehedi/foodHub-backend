import express, { Request, Response, NextFunction } from "express";

const forwardToAuth = (path: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.url = path;
    next();
  };
};

const router = express.Router();

router.get("/get-session", forwardToAuth("/get-session"));

router.post("/sign-out", forwardToAuth("/sign-out"));

export const authRouter = router;
