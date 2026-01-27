import { Request, Response, NextFunction } from "express";

type ControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | void;

const TryCatch = (controllerFn: ControllerFn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (err) {
      console.error("Error in TryCatch:", err);
      next(err);
    }
  };
};

export default TryCatch;
