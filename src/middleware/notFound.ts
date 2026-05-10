import TryCatch from "../utils/TryCatch";

export const notFound = TryCatch(async (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Route not found ${req.path}`,
  });
});
