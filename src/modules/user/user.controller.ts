import { prisma } from "../../lib/prisma";
import { Role } from "../../types/role";
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

  const query = (req.query.query as string) || "";
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    meta: {
      limit,
      offset,
      total,
    },
    users,
  });
});

export const editProfile = TryCatch(async (req, res, next) => {
  const loggedInUserId = req.user?.id as string;
  const loggedInUserRole = req.user?.role;

  const { targetUserId, name, email, role, status, isVerified, emailVerified } =
    req.body;

  if (!loggedInUserId) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  let updateData: any = { name };

  let idToUpdate = loggedInUserId;

  if (loggedInUserRole === "ADMIN") {
    if (targetUserId) idToUpdate = targetUserId;

    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    if (isVerified !== undefined)
      updateData.isVerified = isVerified === "true" || isVerified === true;
    if (emailVerified !== undefined)
      updateData.emailVerified =
        emailVerified === "true" || emailVerified === true;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: idToUpdate,
    },
    data: updateData,
  });

  res.status(200).json({
    success: true,
    message:
      loggedInUserRole === "ADMIN"
        ? "User updated by Admin"
        : "Profile updated successfully",
    user: updatedUser,
  });
});
