import React, { useEffect, useState } from "react";
import api from "../api/axios";
import HouseCard from "../components/HouseCard";
import { Link } from "react-router-dom";

const MyListings = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/houses/owner/my")
      .then(res => setHouses(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (houses.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-gray-700">
          You have no listings yet.
        </h2>
        <p className="text-gray-500 mt-2">
          Start by adding your first house listing!
        </p>

        <Link
          to="/add-house"
          className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add a Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {houses.map((h) => (
        <HouseCard key={h._id} house={h} />
      ))}
    </div>
  );
};

export default MyListings;
