import { prisma } from "../../lib/prisma";
import RegisterUserTP from "../../types/user.type";
import { ErrorHandler } from "../../utils/ErrorHandler";
import bcrypt from "bcryptjs";

const AuthService = {
  registerUser: async ({ name, email, password, role }: RegisterUserTP) => {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ErrorHandler("User alredy exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return newUser;
  },

  loginUser: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user?.isVerified) {
      throw new ErrorHandler("Please verify your email before login", 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ErrorHandler("Invalid email or password", 401);
    }

    return user;
  },
};

export default AuthService;
