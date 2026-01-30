import { prisma } from "../../lib/prisma";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";
import { MealsService } from "./meals.service";

export const createResturant = TryCatch(async (req, res, next) => {
  const { shopName, description, address } = req.body;
  const userId = req.user?.id as string;

  const existingProvider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existingProvider) {
    return next(new ErrorHandler("You already have a restaurant", 400));
  }

  if (!shopName || !address) {
    return next(new ErrorHandler("shopName and address are required", 400));
  }

  const provider = await prisma.providerProfile.create({
    data: {
      userId,
      shopName,
      description,
      address,
      isOpen: true,
    },
  });

  res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    provider,
  });
});

export const createMeal = TryCatch(async (req, res, next) => {
  const { name, description, price, categoryName } = req.body;

  const userId = req.user?.id as string;
  if (!userId) {
    return next(new ErrorHandler("You are not athorized", 400));
  }

  if (!name || !description || !price || !categoryName) {
    return next(
      new ErrorHandler("Name, price and categoryName are required", 400),
    );
  }

  const meal = await MealsService.mealCreate(
    {
      name,
      description,
      price,
      categoryName,
    },
    userId,
  );

  res.status(201).json({
    success: true,
    message: "Meal created successfully",
    meal,
  });
});

export const getMels = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;

  if (!userId) {
    return next(new ErrorHandler("You are not athorized", 400));
  }

  const meals = await prisma.meal.findMany({
    where: {
      userId,
    },
  });

  if (meals.length <= 0) {
    return next(
      new ErrorHandler("Not have your meals please create first", 404),
    );
  }

  return res.status(200).json({
    success: true,
    message: "Founded your all meals",
    meals,
  });
});

export const updateMeal = TryCatch(async (req, res, next) => {
  const mealId = req.params.id as string;

  const userId = req.user?.id as string;

  const { name, description, price, image, isAvailable } = req.body;

  if (!mealId) {
    return next(new ErrorHandler("Meal id is required", 400));
  }

  if (!userId) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  const meal = await MealsService.mealUpdate(
    { name, description, price, image, isAvailable },
    userId,
    mealId,
  );

  res.status(200).json({
    success: true,
    message: "Meal updated successfully",
    meal,
  });
});

export const deleteMeal = TryCatch(async (req, res, next) => {
  const mealId = req.params.id as string;
  const userId = req.user?.id as string;

  if (!userId) {
    return next(new ErrorHandler("You cannot access", 401));
  }

  if (!mealId) {
    return next(
      new ErrorHandler("Meal id missing, you cannot hit this api", 400),
    );
  }

  await MealsService.deleteMeal(mealId, userId);

  res.status(200).json({
    success: true,
    message: "Meal deleted successfully",
  });
});

export const getAllMeals = TryCatch(async (req, res, next) => {
  const meals = await prisma.meal.findMany({
    include: {
      provider: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (meals?.length === 0) {
    return next(new ErrorHandler("Meals not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Meals fetched successfully",
    meals,
  });
});

export const getMealById = TryCatch(async (req, res, next) => {
  const mealId = req.params?.id as string;

  if (!mealId) {
    return next(new ErrorHandler("Meal id not found", 404));
  }

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
    include: {
      provider: true,
    },
  });

  res.status(200).json({
    success: true,
    message: "Meal get successfully",
    meal,
  });
});

export const getAllProvider = TryCatch(async (req, res, next) => {
  const providers = await prisma.providerProfile.findMany();
  if (!providers) {
    return next(new ErrorHandler("Providers not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Providers found",
    providers,
  });
});

export const getProviderById = TryCatch(async (req, res, next) => {
  const providerId = req.params?.id as string;

  if (!providerId) {
    return next(new ErrorHandler("Provider id not found", 404));
  }

  const provider = await prisma.providerProfile.findUnique({
    where: {
      id: providerId,
    },
  });

  res.status(200).json({
    success: true,
    message: "Provider get successfully",
    provider,
  });
});

export const getCategories = TryCatch(async (req, res, next) => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (categories.length === 0) {
    return next(new ErrorHandler("Meals nt found", 404));
  }

  res.status(200).json({
    success: true,
    count: categories.length,
    message: "Categories fetched successfully",
    data: categories,
  });
});

export const getMealsInHome = TryCatch(async (req, res, next) => {
  const meals = await prisma.meal.findMany({
    take: 8,
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      category: true,
    },
  });

  if (meals.length === 0) {
    return next(new ErrorHandler("Meals not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Top 8 meals fetched successfully",
    data: meals,
  });
});
