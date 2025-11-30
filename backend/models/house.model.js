import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description: {
        type: String,
        required: true
        },
        price: {
        type: Number,
        required: true
        },
        location: {
        type: String,
        required: true
        },
        ownerName: {
        type: String,
        required: true
        },
        ownerPhone: {
        type: String,
        required: true
        },
        image:{
            type:[String]
        },
    },
    {timestamps: true}
);

export default mongoose.model("House", houseSchema);