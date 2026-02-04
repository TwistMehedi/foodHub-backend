import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { Role } from "../types/role";

async function seedAdmin() {
  try {
    const adminEmail = "a@gmail.com";
    const adminPassword = "a@gmail.com";

    const exists = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (exists) {
      console.log("Admin user already exists.");
      return;
    }

    const user = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: "Mehedi Hasan",
        role: Role.ADMIN,
      },
    });

    if (user) {
      await prisma.user.update({
        where: { email: adminEmail },
        data: {
          status: "ACTIVE",
          isVerified: true,
          emailVerified: true,
        },
      });

      console.log("✅ Admin seeded successfully with Role.ADMIN!");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    process.exit();
  }
}

seedAdmin();
