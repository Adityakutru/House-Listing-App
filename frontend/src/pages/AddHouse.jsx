import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LocationPicker from "../components/LocationPicker";

export default function AddHouse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    city: "",
    state: "",
    ownerName: "",
    ownerPhone: "",

    // New fields
    listingType: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    listedBy: "",
    parking: "",
    facing: "",
    totalFloors: "",
  });

  const [files, setFiles] = useState([]); // array of File objects
  const [mapLocation, setMapLocation] = useState({ lat: null, lng: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFiles = (e) => {
    // Append new files (Option A)
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ensure location pinned
    if (!mapLocation.lat || !mapLocation.lng) {
      toast.error("Please pin the house location");
      return;
    }

    const data = new FormData();

    // text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // map coords
    data.append("latitude", mapLocation.lat);
    data.append("longitude", mapLocation.lng);

    // append images
    files.forEach((file) => {
      data.append("images", file);
    });

    try {
      await api.post("/houses", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("House added successfully!");
      navigate("/ads");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding house");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New House</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Listing Type */}
        <div>
          <label className="block font-medium">Listing Type</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select type</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>

        {/* Rooms (BHK) */}
        <div>
          <label className="block font-medium mb-1">Rooms (BHK)</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setFormData({ ...formData, bhk: n })}
                className={`px-4 py-2 border rounded ${
                  formData.bhk === n ? "bg-blue-600 text-white" : ""
                }`}
              >
                {n} BHK
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block font-medium mb-1">Bathrooms</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setFormData({ ...formData, bathrooms: n })}
                className={`px-4 py-2 border rounded ${
                  formData.bathrooms === n ? "bg-blue-600 text-white" : ""
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Furnishing */}
        <div>
          <label className="block font-medium mb-1">Furnishing</label>
          <div className="flex gap-2 flex-wrap">
            {["Furnished", "Semi-Furnished", "Unfurnished"].map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() =>
                  setFormData({ ...formData, furnishing: opt })
                }
                className={`px-3 py-2 border rounded ${
                  formData.furnishing === opt ? "bg-blue-600 text-white" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Listed By */}
        <div>
          <label className="block font-medium mb-1">Listed By</label>
          <div className="flex gap-2 flex-wrap">
            {["Builder", "Dealer", "Owner"].map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() =>
                  setFormData({ ...formData, listedBy: opt })
                }
                className={`px-3 py-2 border rounded ${
                  formData.listedBy === opt ? "bg-blue-600 text-white" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Parking */}
        <div>
          <label className="block font-medium mb-1">Parking</label>
          <div className="flex gap-2 flex-wrap">
            {[0, 1, 2, 3].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setFormData({ ...formData, parking: n })}
                className={`px-3 py-2 border rounded ${
                  formData.parking === n ? "bg-blue-600 text-white" : ""
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Facing */}
        <div>
          <label className="block font-medium">Facing</label>
          <select
            name="facing"
            value={formData.facing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select facing</option>
            {["North", "South", "East", "West"].map((dir) => (
              <option key={dir} value={dir}>
                {dir}
              </option>
            ))}
          </select>
        </div>

        {/* Total Floors */}
        <input
          name="totalFloors"
          type="number"
          placeholder="Total Floors"
          value={formData.totalFloors}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Existing inputs: title, desc, price */}
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="3"
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Location Text */}
        <div className="grid grid-cols-1 gap-3">
          <input
            name="area"
            placeholder="Area / Locality"
            value={formData.area}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Owner Details */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="ownerName"
            placeholder="Owner Name"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="ownerPhone"
            placeholder="Owner Phone"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Improved Image Uploader */}
        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <div className="flex items-center gap-2">
            {/* file names + appended add button */}
            {files.map((file, i) => (
              <span
                key={i}
                className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
              >
                {file.name}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}

            <label className="cursor-pointer px-3 py-2 border rounded bg-gray-50 hover:bg-gray-100">
              + Add
              <input
                type="file"
                multiple
                onChange={handleAddFiles}
                className="hidden"
              />
            </label>
          </div>

          {/* image previews */}  
          <div className="mt-2 flex flex-wrap gap-2">
            {files.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Map Picker */}
        {/* MAP PICKER */}
<div className="mt-4">
  <p className="font-medium mb-2">Pin Exact Location on Map</p>

  <LocationPicker
    setLocation={setMapLocation}
    location={mapLocation}
    onAddressFound={(addr) =>
              setFormData((prev) => ({
                ...prev,
                area: prev.area || addr.area,
                city: prev.city || addr.city,
                state: prev.state || addr.state,
              }))
            }
  />

  {mapLocation.lat && (
    <>
      <p className="text-sm text-gray-600 mt-2">
        📍 Selected: {mapLocation.lat.toFixed(4)},{" "}
        {mapLocation.lng.toFixed(4)}
      </p>

      {/* 🧹 Reset Location Button */}
      <button
        type="button"
        onClick={() => {
          // Clear pinned location
          setMapLocation({ lat: null, lng: null });

          // Clear auto-filled address fields
          setFormData((prev) => ({
            ...prev,
            area: "",
            city: "",
            state: "",
          }));
        }}
        className="mt-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-red-500 transition"
      >
        ❌ Reset Location
      </button>
    </>
  )}
</div>


        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add House
        </button>

      </form>
    </div>
  );
}
