import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const navigate = useNavigate()

    const[form, setForm] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit}
            className="bg-white p-8 font-bold text-center">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>                
            </form>
        </div>
    )
}