import { Request } from "express";
import TryCatch from "../../utils/TryCatch";
import { ErrorHandler } from "../../utils/ErrorHandler";
import AuthService from "./auth.service";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import envConfig from "../../config/envConfig";
import { prisma } from "../../lib/prisma";

export const register = TryCatch(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return next(
      new ErrorHandler("Input field is missing please give all field", 400),
    );
  }

  const newUser = await AuthService.registerUser({
    name,
    email,
    password,
    role,
  });

  const token = jwt.sign(
    { userId: newUser.id, role: newUser.role },
    envConfig.jwt_secret as string,
    { expiresIn: "7d" },
  );

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: envConfig.email_user,
      pass: envConfig.email_pass,
    },
  });

  const emailOptions = {
    from: envConfig.email_user,
    to: email,
    subject: "Verify your email to complete registration on FoodHub",
    html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Please click the link below to verify your email and complete your registration:</p>
        <a href="http://localhost:3000/verify-email?token=${token}">Verify Email</a>
        <p>This link will expire in 10 minutes.</p>
      `,
  };

  await transporter.sendMail(emailOptions);

  res.status(201).json({
    success: true,
    message: "Verification email sent. Please check your inbox.",
    token,
  });
});

export const verifyEmail = TryCatch(async (req, res, next) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return next(new ErrorHandler("Token is required or invalid", 400));
  }

  const decoded = jwt.verify(token, envConfig.jwt_secret!) as {
    userId: string;
    role: string;
  };

  await prisma.user.update({
    where: { id: decoded.userId },
    data: { isVerified: true },
  });

  res.status(200).json({
    success: true,
    message: "Registration successfully",
  });
});
