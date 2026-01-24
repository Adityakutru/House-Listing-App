import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent duplicate chat for same house + buyer
chatSchema.index({ house: 1, buyer: 1 }, { unique: true });

export default mongoose.model("Chat", chatSchema);
