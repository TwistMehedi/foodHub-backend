import bcrypt from "bcryptjs";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
  const admin = {
    name: "Mehedi Hasan",
    email: "ataul1708@gmail.com",
    role: Role.ADMIN,
    password: "ataul1708@gmail.com",
    status: "ACTIVE",
    isVerified: true,
  };

  const exists = await prisma.user.findUnique({
    where: { email: admin.email },
  });

  if (exists) {
    return new ErrorHandler("User alredy exists", 400);
  }

  const hashedPassword = await bcrypt.hash(admin.password, 10);

  await prisma.user.create({
    data: {
      name: admin.name,
      email: admin.email,
      password: hashedPassword,
      role: admin.role,
      isVerified: admin.isVerified,
    },
  });

  console.log("Admin created successfully");
}

seedAdmin();
