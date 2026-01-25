import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    listingType: { type: String },     // For Sale / For Rent
    bhk: { type: Number },              // 1,2,3,4...
    bathrooms: { type: Number },        // 1,2,3...
    furnishing: { type: String },       // Furnished / Semi / Unfurnished
    listedBy: { type: String },         // Builder / Dealer / Owner
    parking: { type: Number },          // 0,1,2...
    facing: { type: String },           // North, South, etc.
    totalFloors: { type: Number },      // Numeric total floors
    location: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    images: [{ type: String }],
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("House", houseSchema);
