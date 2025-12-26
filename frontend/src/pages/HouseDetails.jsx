import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HouseImageCarousel from "../components/HouseImageCarousel";

const HouseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/houses/${id}`)
      .then((res) => setHouse(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!house) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/ads")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center gap-2 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{house.title}</h1>
      <p className="text-gray-600 mb-4">{house.location}</p>

      <div className="mb-6">
      <HouseImageCarousel images={house.images} />
      </div>

      <p className="text-xl text-green-600 font-bold mb-4">
        ₹ {formatPrice(house.price)}
      </p>

      <p className="text-gray-700 mb-4">{house.description}</p>

      <div className="mt-4">
        <p className="font-semibold">Owner: {house.ownerName}</p>
        <p className="text-gray-700">Phone: {house.ownerPhone}</p>
      </div>
    </div>
  );
};

export default HouseDetails;
