import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import envConfig from "../config/envConfig";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: envConfig.email_user,
    pass: envConfig.email_pass,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [envConfig.app_url],

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    callbackURL: `${envConfig.app_url}/login`,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const urlObj = new URL(url);
      urlObj.searchParams.set("callbackURL", `${envConfig.app_url}/login`);
      const finalUrl = urlObj.toString();

      const emailOptions = {
        from: `"FoodHub" <${envConfig.email_user}>`,
        to: user.email,
        subject: "Verify your email to complete registration on FoodHub",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Hello ${user.name},</h2>
            <p>Thanks for joining FoodHub! Please verify your email by clicking the button below:</p>
            <a href="${finalUrl}" style="background: #ea580c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
            <p>If the button doesn't work, copy and paste this link:</p>
            <p>${finalUrl}</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(emailOptions);
        console.log(`Verification email sent to ${user.email}`);
      } catch (error) {
        console.error("Nodemailer Error:", error);
      }
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

export type Auth = typeof auth;
