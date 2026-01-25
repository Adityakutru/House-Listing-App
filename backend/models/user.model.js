import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        profilePic: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },
  role: { type: String, default: "user" }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("User",userSchema);