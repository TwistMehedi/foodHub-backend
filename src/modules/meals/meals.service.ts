import { prisma } from "../../lib/prisma";
import { MealType } from "../../types/meal.type";
import { ErrorHandler } from "../../utils/ErrorHandler";

export const MealsService = {
  mealCreate: async (
    { name, description, price, categoryName }: MealType,
    userId: string,
  ) => {
    if (!name || !price || !categoryName || !userId) {
      throw new ErrorHandler(
        "Name, price, categoryName and providerId are required",
        400,
      );
    }

    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    const provider = await prisma.providerProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!provider) {
      throw new ErrorHandler("Provider is required", 400);
    }

    if (!category) {
      throw new ErrorHandler("Category not found", 404);
    }

    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        price: Number(price),
        categoryName,
        categoryId: category.id,
        userId: userId,
        providerId: provider?.id,
      },
    });

    console.log(meal);
    return meal;
  },
};
