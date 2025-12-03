import React, { useEffect, useState } from "react";
import api from "../api/axios";
import HouseCard from "../components/HouseCard";

const Ads = () => {
  const [houses, setHouses] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  useEffect(() => {
    api.get("/houses")
      .then((res) => {
        setHouses(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const applyFilters = () => {
    let list = houses;

    if (filters.location) {
      list = list.filter((h) =>
        h.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      list = list.filter((h) => h.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      list = list.filter((h) => h.price <= Number(filters.maxPrice));
    }

    setFiltered(list);
  };

  return (
    <div className="flex max-w-7xl mx-auto mt-10 gap-8">

      {/* LEFT SIDEBAR FILTERS */}
      <div className="w-72 bg-white p-5 rounded-xl shadow-md h-fit">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Location */}
        <div className="mb-4">
          <label className="font-medium">Location</label>
          <input
            className="w-full border rounded p-2 mt-1"
            placeholder="Search location"
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <label className="font-medium">Price Range</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              placeholder="Min"
              className="w-full border rounded p-2"
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full border rounded p-2"
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* RIGHT LIST VIEW */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          {filtered.length} Properties Found
        </h2>

        <div className="flex flex-col gap-6">
          {filtered.map((house) => (
            <HouseCard key={house._id} house={house} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
