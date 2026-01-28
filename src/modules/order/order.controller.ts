import { prisma } from "../../lib/prisma";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";

export const createOrder = TryCatch(async (req, res, next) => {
    
  const userId = req.user?.id;

  const { providerId, deliveryAddress, items } = req.body;

  // 🔐 auth check
  if (!userId) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  // 🧾 validation
  if (!providerId || !deliveryAddress || !items || items.length === 0) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // 🔎 provider exists?
  const provider = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    return next(new ErrorHandler("Provider not found", 404));
  }

  // 🧮 calculate total amount
  let totalAmount = 0;

  const orderItemsData = [];

  for (const item of items) {
    const meal = await prisma.meal.findUnique({
      where: { id: item.mealId },
    });

    if (!meal) {
      return next(
        new ErrorHandler(`Meal not found with id ${item.mealId}`, 404)
      );
    }

    const itemTotal = meal.price * item.quantity;
    totalAmount += itemTotal;

    orderItemsData.push({
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    });
  }

  // ✅ create order + order items
  const order = await prisma.order.create({
    data: {
      userId,
      providerId,
      deliveryAddress,
      totalAmount,
      items: {
        create: orderItemsData,
      },
    },
    include: {
      items: true,
    },
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});
