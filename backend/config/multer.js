import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "HouseListing",
      resource_type: "image",
      public_id: file.originalname.split(".")[0],
    };
  }
});

const upload = multer({ storage });

export default upload;
