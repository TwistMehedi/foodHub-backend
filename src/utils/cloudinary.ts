import { v2 as cloudinary } from "cloudinary";
import envConfig from "../config/envConfig";

cloudinary.config({
  cloud_name: envConfig.cloud_name!,
  api_key: envConfig.api_key!,
  api_secret: envConfig.api_secret!,
});

export const uploadFile = async (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "vercel_uploads" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
