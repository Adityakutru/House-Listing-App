import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

export default function HouseCard({ house }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      onClick={() => navigate(`/house/${house._id}`)}
      className="flex bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border p-4 gap-4"
    >
      {/* LEFT IMAGE */}
      <div className="w-48 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
        <img
          src={house.images?.[0] || "https://via.placeholder.com/300"}
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-semibold">{house.title}</h2>
          <p className="text-gray-600 text-sm">{house.location}</p>

          <p className="text-green-600 font-semibold text-lg mt-1">
            ₹ {formatPrice(house.price)}
          </p>

          {/* Toggle Expand Button */}
          <button
            onClick={toggleExpand}
            className="text-black-600 font-medium mt-3 hover:underline"
          >
            {expanded ? "Hide Details ↑" : "View Details ↓"}
          </button>

          {/* EXPANDED CONTENT */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className="bg-gray-50 rounded-lg shadow-inner p-4 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-gray-700 mb-2">{house.description}</p>
              <p className="font-semibold">Owner: {house.ownerName}</p>
              <p>Phone: {house.ownerPhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
