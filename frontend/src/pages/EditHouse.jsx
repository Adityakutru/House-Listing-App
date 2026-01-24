import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function EditHouse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    ownerName: "",
    ownerPhone: "",
    location: "",
  });

  useEffect(() => {
    api
      .get(`/houses/${id}`)
      .then((res) => {
        setFormData({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          ownerName: res.data.ownerName,
          ownerPhone: res.data.ownerPhone,
          location: res.data.location,
        });
      })
      .catch(() => toast.error("Failed to load listing"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/houses/${id}`, formData);
      toast.success("Listing updated successfully");
      navigate("/my-listings");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Edit Listing
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITLE & PRICE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* OWNER DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Owner Name</label>
            <input
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Owner Phone</label>
            <input
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/my-listings")}
            className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
