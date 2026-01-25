import express from "express";
import authMiddleware from "../middleware/auth.js";
import upload from "../config/multer.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Get logged-in user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update profile (name, phone, image)
router.put(
  "/profile",
  authMiddleware,
  upload.single("profilePic"),
  updateUserProfile
);

export default router;
