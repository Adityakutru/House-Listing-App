import mongoose from "mongoose";
import dotenv from "dotenv";
import House from "../models/house.model.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const sampleData = [
  {
    "title": "1BHK Semi-Furnished",
    "description": "Cozy room near ITER College",
    "price": 6500,
    "location": "Jagamara",
    "ownerName": "Rakesh",
    "ownerPhone": "9123456780",
    "images": ["url1", "url2"]
  },
  {
    "title": "3BHK Spacious Apartment",
    "description": "Perfect for group of students",
    "price": 15000,
    "location": "Khandagiri",
    "ownerName": "Manoj",
    "ownerPhone": "9988776655",
    "images": ["url1", "url2"]
  },
  {
    "title": "Single Room Non-Furnished",
    "description": "Budget-friendly room near Campus",
    "price": 3500,
    "location": "Patia",
    "ownerName": "Suresh",
    "ownerPhone": "9090909090",
    "images": ["url1", "url2"]
  },
  {
    "title": "2BHK Newly Built",
    "description": "Modern flat with balcony view",
    "price": 11000,
    "location": "Damana Square",
    "ownerName": "Anita",
    "ownerPhone": "9812345678",
    "images": ["url1", "url2"]
  },
  {
    "title": "PG for Boys",
    "description": "Includes food, WiFi, and laundry",
    "price": 7500,
    "location": "Jaydev Vihar",
    "ownerName": "Prakash",
    "ownerPhone": "9000012345",
    "images": ["url1", "url2"]
  },
  {
    "title": "Studio Apartment",
    "description": "Compact and ideal for single students",
    "price": 5500,
    "location": "Railway Station Road",
    "ownerName": "Reena",
    "ownerPhone": "8888444477",
    "images": ["url1", "url2"]
  },
  {
    "title": "Sharing Room (2 People)",
    "description": "Fully furnished with AC",
    "price": 4000,
    "location": "Nayapalli",
    "ownerName": "Deepak",
    "ownerPhone": "9345678123",
    "images": ["url1", "url2"]
  },
  {
    "title": "4BHK Luxury House",
    "description": "Independent house best for families",
    "price": 25000,
    "location": "Chandrasekharpur",
    "ownerName": "Rashmi",
    "ownerPhone": "9001234567",
    "images": ["url1", "url2"]
  },
  {
    "title": "2BHK Near Market",
    "description": "Close to bus stand and shops",
    "price": 8000,
    "location": "Saheed Nagar",
    "ownerName": "Kiran",
    "ownerPhone": "9456123789",
    "images": ["url1", "url2"]
  },
  {
    "title": "Single Room With Attached Bathroom",
    "description": "Peaceful area, ideal for girls",
    "price": 5000,
    "location": "Acharya Vihar",
    "ownerName": "Meena",
    "ownerPhone": "9876501234",
    "images": ["url1", "url2"]
  }
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await House.deleteMany();   // optional
  await House.insertMany(sampleData);

  console.log("Seeding complete");
  process.exit();
};

seedDB();
