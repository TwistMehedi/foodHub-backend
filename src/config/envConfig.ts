import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  app_url: process.env.APP_URL,
};

export default envConfig;
