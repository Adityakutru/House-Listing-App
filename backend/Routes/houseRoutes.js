import express from 'express'
import { addHouse,getHouses , getHouseById } from '../controllers/houseController.js';


const router = express.Router();

router.post("/", addHouse);
router.get("/", getHouses);
router.get("/:id", getHouseById);

export default router;
