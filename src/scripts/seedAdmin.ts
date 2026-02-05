import { prisma } from "../lib/prisma";
import { Role } from "../types/role";

async function bootstrapSuperUser() {
  try {
    const superUserPayload = {
      name: "Loyot",
      email: "loyot30073@aixind.com",
      role: Role.ADMIN,
      password: "loyot30073@aixind.com",
    };

    const userAlreadyThere = await prisma.user.findUnique({
      where: {
        email: superUserPayload.email,
      },
    });

    if (userAlreadyThere) {
      throw new Error("Account already present!");
    }

    const registrationResponse = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(superUserPayload),
      },
    );

    if (registrationResponse.ok) {
      await prisma.user.update({
        where: {
          email: superUserPayload.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }

    console.log("SEED ADMIN CREATE COMPLETED SUCCESSFULLY");
  } catch (err) {
    console.error("Bootstrap failed:", err);
  }
}

bootstrapSuperUser();
