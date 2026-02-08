import { prisma } from "../../lib/prisma";
import { ErrorHandler } from "../../utils/ErrorHandler";
import TryCatch from "../../utils/TryCatch";

export const createReview = TryCatch(async (req, res, next) => {
  const userId = req.user?.id;

  try {
    const { rating, comment, mealId } = req.body;

    if (!rating || !userId || !mealId) {
      return next(new ErrorHandler("Rating not created", 400));
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: comment || null,
        userId: userId,
        mealId: mealId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: review,
    });
  } catch (error: any) {
    console.error("Error creating review:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});
