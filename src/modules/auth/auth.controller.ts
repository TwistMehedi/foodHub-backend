import { Request } from "express";
import TryCatch from "../../utils/TryCatch";

export const register = TryCatch(async (req, res, next) => {
  console.log(req.body);
});
