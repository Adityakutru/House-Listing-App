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
      className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border p-4 gap-4"
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
            ₹ {house.price}
          </p>

          {/* Toggle Expand */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // stop card navigation
              setExpanded(!expanded);
            }}
            className="text-blue-600 font-medium mt-3 hover:underline"
          >
            {expanded ? "Hide Details ↑" : "View Details ↓"}
          </button>

          {/* EXPANDED CONTENT */}
          {expanded && (
            <div
              className="mt-3 p-3 bg-gray-50 rounded-lg border space-y-1"
              onClick={(e) => e.stopPropagation()} // prevent full-page opening
            >
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
