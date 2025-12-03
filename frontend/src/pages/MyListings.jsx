import React, { useEffect, useState } from "react";
import api from "../api/axios";
import HouseCard from "../components/HouseCard";

const MyListings = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    api.get("/houses/owner/my")
      .then(res => setHouses(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {houses.map((h) => (
        <HouseCard key={h._id} house={h} />
      ))}
    </div>
  );
};

export default MyListings;
