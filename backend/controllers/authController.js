import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async(req, res)=>{
    try {
        const{name, email, password} = req.body;

        const existing = await User.findOne({ email })

        if(existing){
            return res.status(400).json({message:"Email already registered"})
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password:hashed,
        });

        await user.save();

        res.status(201).json({
            message: "User register successfully",
            user: {id: user._id, name: user.name, email:user.email,profilePic: user.profilePic,
    role: user.role,},
        });
    } catch (error) {
        res.status(500).json({message:"Register failed", error: error.message});
    }
};

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });

        if(!user)
            return res.status(404).json({message:"User not found"})

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({ message: "Invalid password"});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login success",
            token,
            user:{id:user._id, name: user.name, email: user.email, profilePic: user.profilePic,
    role: user.role,}, 
        });
    } catch (error) {
        res.status(500).json({message: "Login error", error: error.message});
    }
}