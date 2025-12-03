import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddHouse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    ownerName: "",
    ownerPhone: "",
  });

  const [files, setFiles] = useState([]); // <-- FIXED

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CREATE FORMDATA
    const data = new FormData();

    // append all normal text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // append image files
    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }

    try {
      await api.post("/houses", data);
      toast.success("House added successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error adding house");

    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Add New House</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
          ></textarea>
        </div>

        {/* PRICE */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            name="location"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* OWNER */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Owner Name</label>
            <input
              name="ownerName"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Owner Phone</label>
            <input
              name="ownerPhone"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add House
        </button>
      </form>
    </div>
  );
}
