import { prisma } from "../../lib/prisma";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";

export const createCategory = TryCatch(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler("Category name is required", 400));
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (existingCategory) {
    return next(new ErrorHandler("Category already exists", 409));
  }

  const category = await prisma.category.create({
    data: {
      name,
      userId: req.user?.id as string,
    },
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});
