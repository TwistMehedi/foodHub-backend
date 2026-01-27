import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
};

export default envConfig;
