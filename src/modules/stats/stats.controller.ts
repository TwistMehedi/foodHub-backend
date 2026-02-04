import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";
import {
  getAdminDashboardStats,
  getProviderDashboardStats,
} from "./stats.service";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  const userId = req.user?.id;
  // console.log(userId);
  if (!userId) {
    return next(new ErrorHandler("Provider access required", 403));
  }

  const stats = await getProviderDashboardStats(userId);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

export const getAdminStats = TryCatch(async (req, res, next) => {
  const stats = await getAdminDashboardStats();

  res.status(200).json({
    success: true,
    message: "Admin stats fetched successfully",
    data: stats,
  });
});
