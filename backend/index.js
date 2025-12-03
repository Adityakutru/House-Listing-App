import express from 'express'
import houseRoutes from './Routes/houseRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from "./Routes/authRoutes.js"

dotenv.config();
const app = express();

app.use(express.json())

app.use(cors({origin:"http://localhost:5173"}));

app.use("/api/auth", authRoutes);

app.use("/api/houses",houseRoutes);


connectDB();

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
})