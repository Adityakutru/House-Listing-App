import { useState } from "react";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
    });

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
    try {
        const res = await axios.post("http://localhost:3000/api/auth/register",form);
        toast.success("Account created successfully!");
        navigate("/login");

    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
    }
    };
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Create Account</h2>
                <input type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full p-3 border rounded"/>
                <input type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-3 border rounded"
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-3 border rounded"
                />

                <button className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700">Sign Up</button>

                <p className="text-sm text-center">Already have an account?{" "}
                    <span onClick={()=>navigate("/login")}
                        className="text-blue-600 cursor-pointer hover:underline">
                    Login
                    </span>
                </p>
            </form>
        </div>
    )

}