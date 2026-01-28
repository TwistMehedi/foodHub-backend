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

  mealUpdate: async (
    {
      name,
      description,
      price,
      image,
    }: { name: string; description: string; price: number; image: string },
    userId: string,
    mealId: string,
  ) => {
    const provider = await prisma.providerProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!provider) {
      throw new ErrorHandler("You not owner this meal", 401);
    }

    const meal = await prisma.meal.findFirst({
      where: {
        id: mealId,
        userId,
        providerId: provider.id,
      },
    });

    if (!meal) {
      throw new ErrorHandler("Meal not found", 404);
    }

    const updatedMeal = await prisma.meal.update({
      where: { id: mealId },
      data: {
        name,
        description,
        price,
        image,
      },
    });

    return updatedMeal;
  },
};
