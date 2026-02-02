import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import envConfig from "../config/envConfig";
import fs from "fs";
dotenv.config();

cloudinary.config({
  cloud_name: envConfig.cloud_name!,
  api_key: envConfig.api_key!,
  api_secret: envConfig.api_secret!,
});

export const uploadFile = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("File uploaded:", result.secure_url);
    return result;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    console.log("Image deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};
