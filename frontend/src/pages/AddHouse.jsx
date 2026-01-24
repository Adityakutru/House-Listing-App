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
});


  const [files, setFiles] = useState([]);
  const [mapLocation, setMapLocation] = useState({ lat: null, lng: null });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutoFillAddress = (address) => {
  setFormData((prev) => ({
    ...prev,
    area: prev.area || address.area || "",
    city: prev.city || address.city || "",
    state: prev.state || address.state || "",
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Ensure location is pinned
    if (!mapLocation.lat || !mapLocation.lng) {
      toast.error("Please pin the house location on the map");
      return;
    }

    const data = new FormData();

    // append text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // append map coordinates
    data.append("latitude", mapLocation.lat);
    data.append("longitude", mapLocation.lng);
    data.append(
  "location",
  `${formData.area}, ${formData.city}, ${formData.state}`
);


    // append images
    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }

    try {
      await api.post("/houses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("House added successfully!");
      navigate("/ads");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding house");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Add New House</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="3"
        ></textarea>

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* LOCATION TEXT */}
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


        {/* OWNER DETAILS */}
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

        {/* MAP PICKER */}
        <div>
          <p className="font-medium mb-2">Pin Exact Location on Map</p>
          <LocationPicker
  setLocation={setMapLocation}
  location={mapLocation}
  onAddressFound={handleAutoFillAddress}
/>

          {mapLocation.lat && (
            <p className="text-sm text-gray-600 mt-2">
              📍 Selected: {mapLocation.lat.toFixed(4)},{" "}
              {mapLocation.lng.toFixed(4)}
            </p>
          )}
        </div>

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
