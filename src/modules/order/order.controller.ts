import { prisma } from "../../lib/prisma";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";

export const createOrder = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  console.log(userId);
  const { providerId, deliveryAddress, items } = req.body;
  console.log(items);
  if (!items || items.length === 0) {
    return next(new ErrorHandler("Cart is empty", 400));
  }

  const totalAmount = items.reduce(
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
  });

  res.status(200).json({
    success: true,
    message: "Your all orders",
    orders,
  });
});

export const singleOrder = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  const id = req.params.id as string; // এটি অর্ডারের প্রাইমারি ID

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
