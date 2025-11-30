import express from 'express'
import { addHouse,getHouses , getHouseById } from '../controllers/houseController.js';
import upload from '../config/multer.js';


const router = express.Router();

router.post("/",upload.array("images", 5), addHouse);
router.get("/", getHouses);
router.get("/:id", getHouseById);

export default router;
