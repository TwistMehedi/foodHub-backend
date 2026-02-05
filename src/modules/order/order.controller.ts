import { prisma } from "../../lib/prisma";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";

export const createOrder = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  // console.log(userId);
  const { providerId, deliveryAddress, items } = req.body;
  // console.log(items);
  if (!items || items.length === 0) {
    return next(new ErrorHandler("Cart is empty", 400));
  }

  let mealItems = Array.from(items);
  const totalAmount = mealItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const result = await prisma.$transaction(
    async (tx) => {
      const address = await tx.address.create({
        data: {
          roadNumber: deliveryAddress.roadNumber,
          postCode: deliveryAddress.postCode,
          phone: deliveryAddress.phone,
          house: deliveryAddress.house,
          areaName: deliveryAddress.areaName,
        },
      });

      const order = await tx.order.create({
        data: {
          userId,
          providerId,
          mealId: items[0].mealId,
          deliveryAddress: address.id,
          totalAmount,
          status: "PLACED",
        },
      });

      const orderItemsData = items.map((item: any) => ({
        orderId: order.id,
        customerId: userId,
        quantity: item.quantity,
        price: item.price,
      }));

      await tx.orderItem.createMany({
        data: orderItemsData,
      });

      return order;
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: result,
  });
});

export const getOrderByCustomer = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  if (!userId) {
    next(new ErrorHandler("User not fouund", 401));
  }
  const orders = await prisma.orderItem.findMany({
    where: {
      customerId: userId,
    },
    include: {
      order: true,
    },
  });

  res.status(200).json({
    success: true,
    message: "Your all orders",
    orders,
  });
});

export const singleOrder = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  const id = req.params.id as string;

  const order = await prisma.order.findFirst({
    where: {
      id: id,
      userId: userId,
    },
    include: {
      meal: true,
      address: true,
      provider: {
        select: {
          shopName: true,
        },
      },
    },
  });
  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found or you don't have permission.",
    });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export const getOrderByProvider = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  if (!userId) {
    next(new ErrorHandler("User not fouund", 401));
  }
  const providerProfile = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
    select: { id: true },
  });

  const providerId = providerProfile?.id as string;

  const orders = await prisma.order.findMany({
    where: {
      providerId,
    },
    include: {
      user: true,
    },
  });

  res.status(200).json({
    success: true,
    message: "Your all orders",
    orders,
  });
});

export const singleOrderByProvider = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  const id = req.params.id as string;

  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) {
    return next(new ErrorHandler("Provider profile not found", 404));
  }

  const order = await prisma.order.findFirst({
    where: {
      id,
      providerId: provider.id,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
      address: true,
      items: {
        include: {
          meal: { select: { name: true, price: true } },
        },
      },
    },
  });

  if (!order) {
    return next(new ErrorHandler("Order not found or unauthorized", 404));
  }

  res.status(200).json({
    success: true,
    message: "Order details fetched successfully",
    data: order,
  });
});

export const updateOrderStatus = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;

  if (!userId) {
    return next(new ErrorHandler("You are unathorized", 401));
  }
  const id = req.params.id as string;
  const { status } = req.body;

  const allowedStatuses = [
    "PLACED",
    "PREPARING",
    "READY",
    "DELIVERED",
    "CANCELLED",
  ];

  if (!allowedStatuses.includes(status)) {
    return next(
      new ErrorHandler(
        `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
        400,
      ),
    );
  }

  const existingOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!existingOrder) {
    return next(new ErrorHandler("Order not found", 404));
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status,
      ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}),
    },
  });

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status} successfully`,
    data: updatedOrder,
  });
});

export const allOrdersForAdmin = TryCatch(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const updateOrderStatusByAdmin = TryCatch(async (req, res, next) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return next(new ErrorHandler("Order ID and Status are required!", 400));
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order: updatedOrder,
  });
});
