import express from "express";
import adminMiddleware from "../middleware/admin.js";
import {
  getAllUsers,
  deleteUser,
  getAllHousesAdmin,
  deleteHouseAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// Only admin can use these
router.use(adminMiddleware);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/houses", getAllHousesAdmin);
router.delete("/houses/:id", deleteHouseAdmin);

export default router;
