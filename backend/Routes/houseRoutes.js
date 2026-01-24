import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/auth.js";

import {
  addHouse,
  getHouses,
  getHouseById,
  getMyHouses,
  deleteHouse,
  updateHouse,
} from "../controllers/houseController.js";

const router = express.Router();

// ADD HOUSE
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  addHouse
);

// GET MY HOUSES
router.get("/owner/my", authMiddleware, getMyHouses);

// GET ALL HOUSES
router.get("/", getHouses);

// GET SINGLE HOUSE
router.get("/:id", getHouseById);

// DELETE HOUSE
router.delete("/:id", authMiddleware, deleteHouse);

// UPDATE HOUSE
router.put("/:id", authMiddleware, updateHouse);

export default router;
