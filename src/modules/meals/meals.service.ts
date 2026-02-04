import { prisma } from "../../lib/prisma";
import { MealType } from "../../types/meal.type";
import { deleteImage, uploadFile } from "../../utils/cloudinary";
import { ErrorHandler } from "../../utils/ErrorHandler";

export const MealsService = {
  mealCreate: async (
    { name, description, price, categoryName, image }: MealType,
    userId: string,
    file: Express.Multer.File,
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

    const imageUploadResult: any = await uploadFile(file.buffer);

    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        price: Number(price),
        categoryName,
        categoryId: category.id,
        userId: userId,
        providerId: provider?.id,
        image: imageUploadResult.secure_url,
        imagePublicId: imageUploadResult.public_id,
      },
    });

    // console.log(meal);
    return meal;
  },

  mealUpdate: async (
    {
      name,
      description,
      price,
      image,
      isAvailable,
    }: {
      name: string;
      description: string;
      price: number;
      image: string;
      isAvailable: boolean;
    },
    userId: string,
    mealId: string,
    file?: Express.Multer.File,
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

    let imageUrl = meal.image;

    if (file) {
      try {
        const uploadResult: any = await uploadFile(file.buffer);
        imageUrl = uploadResult?.secure_url;

        if (meal.image) {
          const publicId = meal.image.split("/").pop()?.split(".")[0];
          if (publicId) {
            await deleteImage(publicId);
          }
        }
      } catch (error) {
        throw new ErrorHandler("Failed to process image upload", 500);
      }
    }

    const updatedMeal = await prisma.meal.update({
      where: { id: mealId },
      data: {
        name,
        description,
        price: Number(price),
        image: imageUrl,
        isAvailable: String(isAvailable) === "true",
      },
    });

    return updatedMeal;
  },

  deleteMeal: async (mealId: string, userId: string) => {
    const meal = await prisma.meal.findUnique({
      where: { id: mealId, userId },
    });

    if (!meal) {
      throw new ErrorHandler("Meal not found", 404);
    }

    if (userId !== meal.userId) {
      throw new ErrorHandler("You are not allowed to delete this meal", 403);
    }

    return await prisma.meal.delete({
      where: { id: mealId },
    });
  },
};
