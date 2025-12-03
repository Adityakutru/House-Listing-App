import express from "express";
import { addHouse, getHouses, getHouseById } from "../controllers/houseController.js";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/auth.js";   // ✅ IMPORT HERE

const router = express.Router();

router.post(
  "/",
  (req, res, next) => { console.log("1️⃣ Route hit"); next(); },
  authMiddleware,
  (req, res, next) => { console.log("2️⃣ Auth passed"); next(); },
  upload.array("images", 5),
  (req, res, next) => { console.log("3️⃣ Multer passed"); next(); },
  addHouse
);


router.get("/", getHouses);
router.get("/:id", getHouseById);

export default router;
