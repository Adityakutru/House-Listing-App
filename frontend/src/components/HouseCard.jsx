import { Link } from "react-router-dom";

export default function HouseCard({ house }) {
  return (
    <div className="flex bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden border">
      
      {/* Left: Image */}
      <div className="w-48 h-36 bg-gray-200">
        <img
          src={house.images?.[0] || "https://via.placeholder.com/300"}
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{house.title}</h2>
          <p className="text-sm text-gray-600">{house.location}</p>

          <p className="text-green-600 font-bold mt-2 text-xl">
            ₹ {house.price}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Owner: {house.ownerName}
          </p>
        </div>

        <Link
          to={`/house/${house._id}`}
          className="text-blue-600 font-medium mt-3 hover:underline self-start"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
