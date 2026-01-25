import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../api/axios";

import HouseImageCarousel from "../components/HouseImageCarousel";
import { formatPrice } from "../utils/formatPrice";

// 🔴 FIX LEAFLET MARKER ICON ISSUE
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const HouseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [house, setHouse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/houses/${id}`)
      .then((res) => setHouse(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!house) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/ads")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center gap-2 transition"
      >
        ← Back to Ads
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-1">{house.title}</h1>
      <p className="text-gray-600 mb-4">{house.location}</p>

      {/* IMAGE CAROUSEL */}
      <div className="mb-6">
        <HouseImageCarousel images={house.images} />
      </div>

      {/* PRICE */}
      <p className="text-2xl text-green-600 font-bold mb-4">
        ₹ {formatPrice(house.price)}
      </p>

      {/* ————— Details Grid ————— */}
      <div className="border-2 shadow-gray-950 border-gray-200 rounded-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-800">
        <div className="flex justify-between">
          <span className="font-semibold">Listing Type:</span>
          <span>{house.listingType || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Rooms (BHK):</span>
          <span>{house.bhk ?? "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Bathrooms:</span>
          <span>{house.bathrooms ?? "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Furnishing:</span>
          <span>{house.furnishing || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Listed By:</span>
          <span>{house.listedBy || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Parking:</span>
          <span>{house.parking ?? "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Facing:</span>
          <span>{house.facing || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Total Floors:</span>
          <span>{house.totalFloors ?? "-"}</span>
        </div>
      </div>
      </div>
      {/* DESCRIPTION */}
      <p className="text-gray-700 font-semibold mt-6">Description:</p>
      <div className="border-2 shadow-gray-950 border-gray-200 rounded-sm">
      <p className="text-gray-700 mb-6">{house.description}</p>
      </div>
      {/* OWNER DETAILS */}
      <div className="mb-6 mt-6 space-y-2">
        <p className="font-semibold">Owner: {house.ownerName}</p>
        <p className="text-gray-700">Phone: {house.ownerPhone}</p>

        {/* CHAT BUTTON */}
        {user && user.id !== house.owner && (
          <button
            onClick={async () => {
              try {
                const res = await api.post(
                  "/chat/start",
                  { houseId: house._id },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "token"
                      )}`,
                    },
                  }
                );

                navigate(`/chat/${res.data._id}`);
              } catch (err) {
                alert("Unable to start chat");
              }
            }}
            className="mt-3 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            💬 Chat with Owner
          </button>
        )}

        {!user && (
          <p className="text-sm text-gray-500 mt-2">
            Please login to chat with the owner.
          </p>
        )}
      </div>

      {/* MAP SECTION */}
      {house.latitude && house.longitude && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-3"> Property Location</h2>

    <MapContainer
      center={[house.latitude, house.longitude]}
      zoom={15}
      style={{ height: "300px", borderRadius: "12px" }}
      className="shadow"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[house.latitude, house.longitude]} />
    </MapContainer>

    {/* 📍 View on Google Maps Button */}
    <a
      href={`https://www.google.com/maps?q=${house.latitude},${house.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-blue-700 transition"
    >
      📍 View on Google Maps
    </a>
  </div>
)}

    </div>
  );
};

export default HouseDetails;
