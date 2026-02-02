import { prisma } from "../../lib/prisma";

export const getProviderDashboardStats = async (userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: userId },
    select: { id: true },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found for this user");
  }

  const providerId = providerProfile.id;

  const [totalMeals, totalOrders, earningsData, recentOrders] =
    await Promise.all([
      prisma.meal.count({
        where: { providerId: providerId },
      }),

      prisma.order.count({
        where: { providerId: providerId },
      }),

      prisma.order.aggregate({
        where: {
          providerId: providerId,
          status: "DELIVERED",
        },
        _sum: {
          totalAmount: true,
        },
      }),

      prisma.order.findMany({
        where: { providerId: providerId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          user: { select: { name: true } },
        },
      }),
    ]);

  const stats = {
    totalMeals,
    totalOrders,
    totalEarnings: earningsData._sum.totalAmount || 0,
    recentOrders,
  };

  return stats;
};

export const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    totalProviders,
    totalMeals,
    totalOrders,
    revenueData,
    recentOrders,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "PROVIDER" } }),
    prisma.meal.count(),
    prisma.order.count(),

    prisma.order.aggregate({
      where: { status: "DELIVERED" },
      _sum: { totalAmount: true },
    }),

    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        provider: { select: { shopName: true } },
      },
    }),
  ]);

  return {
    totalUsers,
    totalProviders,
    totalMeals,
    totalOrders,
    totalRevenue: revenueData._sum.totalAmount || 0,
    recentOrders,
  };
};
