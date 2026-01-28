import { Role } from "../../../generated/prisma/enums";
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

export const getUsersByAdmin = TryCatch(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  if (user.role !== Role.ADMIN) {
    return next(new ErrorHandler("You are not authorized", 403));
  }

  const users = await prisma.user.findMany();

  if (users.length === 0) {
    return next(new ErrorHandler("No users found", 404));
  }

  res.status(200).json({
    success: true,
    message: "All users founded",
    users,
  });
});

export const updateUserStatusByAdmin = TryCatch(async (req, res, next) => {
  const admin = req.user;
  const userId = req.params.id as string;
  const { status } = req.body;

  if (!admin || admin.role !== Role.ADMIN) {
    return next(new ErrorHandler("You are not authorized", 403));
  }

  if (!userId) {
    return next(new ErrorHandler("User id is required", 400));
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.id === admin.id) {
    return next(new ErrorHandler("Admin cannot change own status", 400));
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { status },
  });

  res.status(200).json({
    success: true,
    message: "User status updated successfully",
    user: updatedUser,
  });
});
