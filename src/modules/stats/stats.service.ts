import { prisma } from "../../lib/prisma";

export const getProviderDashboardStats = async (userId: string) => {
  const providerProfile = (await prisma.providerProfile.findUnique({
    where: { userId: userId },
    select: { id: true },
  })) as any;

  const providerId = providerProfile?.id;

  let stats = null;
  if (providerId) {
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

    stats = {
      totalMeals,
      totalOrders,
      totalEarnings: earningsData._sum.totalAmount || 0,
      recentOrders,
    };
  } else {
    return false;
  }

  return stats;
};

export const getUserDashboardStats = async (userId: string) => {
  const [totalOrders, totalSpent, recentOrders] = await Promise.all([
    prisma.order.count({
      where: { userId: userId },
    }),
    prisma.order.aggregate({
      where: { userId: userId, status: "DELIVERED" },
      _sum: { totalAmount: true },
    }),
    prisma.order.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        provider: { select: { shopName: true } },
      },
    }),
  ]);

  return {
    totalOrders,
    totalSpent: totalSpent._sum.totalAmount || 0,
    recentOrders,
  };
};

export const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    totalProviders,
    totalMeals,
    totalOrders,
    revenueData,
    recentOrders,

    monthlyRevenue,

    deliveredOrders,
    pendingOrders,
    cancelledOrders,
  ] = await Promise.all([
    prisma.user.count({
      where: { role: "CUSTOMER" },
    }),

    prisma.user.count({
      where: { role: "PROVIDER" },
    }),

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
        user: {
          select: { name: true },
        },
        provider: {
          select: { shopName: true },
        },
      },
    }),

    prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        status: "DELIVERED",
      },
      _sum: {
        totalAmount: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    prisma.order.count({
      where: {
        status: "DELIVERED",
      },
    }),

    prisma.order.count({
      where: {
        status: "PREPARING",
      },
    }),

    prisma.order.count({
      where: {
        status: "CANCELLED",
      },
    }),
  ]);

  const monthlyRevenueData = monthlyRevenue.map((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "short",
    });

    return {
      month,
      revenue: item._sum.totalAmount || 0,
    };
  });

  const orderStatusData = [
    {
      name: "Delivered",
      value: deliveredOrders,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: pendingOrders,
      color: "#f59e0b",
    },
    {
      name: "Cancelled",
      value: cancelledOrders,
      color: "#ef4444",
    },
  ];

  return {
    totalUsers,
    totalProviders,
    totalMeals,
    totalOrders,
    totalRevenue: revenueData._sum.totalAmount || 0,
    recentOrders,

    monthlyRevenueData,
    orderStatusData,
  };
};
