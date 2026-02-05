import { prisma } from "../../lib/prisma";
import { uploadFile } from "../../utils/cloudinary";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";
import { MealsService } from "./meals.service";

export const createResturant = TryCatch(async (req, res, next) => {
  const { shopName, description, address } = req.body;

  if (!req.file) {
    return next(new ErrorHandler("Please upload a restaurant image", 400));
  }

  const userId = req.user?.id as string;

  const imageUploadResult: any = await uploadFile(req.file.buffer);

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
      image: imageUploadResult.secure_url,
      imagePublicId: imageUploadResult.public_id,
    },
  });

  res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    provider,
  });
});

export const getResturant = TryCatch(async (req, res, next) => {
  const userId = req.user?.id as string;
  if (!userId) {
    return next(new ErrorHandler("You are not athorized", 400));
  }
  const resturant = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!resturant) {
    return next(
      new ErrorHandler("Not have resturant please create first", 400),
    );
  }

  res.status(200).json({
    success: true,
    message: "Resturant goted",
    resturant,
  });
});

export const createMeal = TryCatch(async (req, res, next) => {
  const { name, description, price, categoryName, image } = req.body;

  const file = req.file;

  const userId = req.user?.id as string;

  if (!userId) {
    return next(new ErrorHandler("You are not athorized", 400));
  }

  if (!file) {
    return next(new ErrorHandler("Please upload a restaurant image", 400));
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
      image,
    },
    userId,
    file,
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

  // console.log(meals);
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

  const file = req?.file!;

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
    file,
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
  const searchTerm = req.query.searchTerm as string;
  const category = req.query.category as string;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const whereCondition: any = {};

  if (searchTerm) {
    whereCondition.OR = [
      { name: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  if (category) {
    whereCondition.categoryName = {
      equals: category,
      mode: "insensitive",
    };
  }

  const [meals, totalCount] = await Promise.all([
    prisma.meal.findMany({
      where: whereCondition,
      include: {
        provider: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    }),
    prisma.meal.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
    success: true,
    message: meals.length > 0 ? "Meals fetched successfully" : "No meals found",
    meta: {
      page,
      limit,
      totalCount,
      totalPages,
    },
    meals: meals || [],
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
    include: {
      meals: true,
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
    include: {
      _count: {
        select: { meals: true },
      },
    },
  });

  res.status(200).json({
    success: true,
    count: categories.length,
    message: "Categories fetched successfully!",
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

  res.status(200).json({
    success: true,
    message: "Top 8 meals fetched successfully",
    data: meals,
  });
});

export const deleteCategory = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const isCategoryExist = await prisma.category.findUnique({
    where: { id: id as string },
  });

  if (!isCategoryExist) {
    return next(new ErrorHandler("Category not found", 404));
  }

  await prisma.category.delete({
    where: {
      id: id as string,
    },
  });

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
