import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HouseCard({ house }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const openFullPage = () => {
    navigate(`/house/${house._id}`);
  };

  return (
    <div
      onClick={openFullPage}
      className="flex bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden border cursor-pointer"
    >
      {/* Left Image */}
      <div className="w-48 h-36 bg-gray-200">
        <img
          src={house.images?.[0] || "https://via.placeholder.com/300"}
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{house.title}</h2>
          <p className="text-sm text-gray-600">{house.location}</p>

          <p className="text-green-600 font-bold mt-2 text-xl">
            ₹ {house.price}
          </p>

          {/* Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent click from opening detail page
              setExpanded(!expanded);
            }}
            className="text-blue-600 font-medium mt-3 hover:underline"
          >
            {expanded ? "Hide Details ↑" : "View Details ↓"}
          </button>

          {/* Expanded content */}
          {expanded && (
            <div className="mt-3 text-gray-700 space-y-1">
              <p>{house.description}</p>
              <p className="font-semibold">Owner: {house.ownerName}</p>
              <p>Phone: {house.ownerPhone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
