import React, { useEffect, useState } from "react";
import api from "../api/axios";
import HouseCard from "../components/HouseCard";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    api.get("/houses")
      .then((res) => {
        setHouses(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = () => {
    let list = houses;

    if (filters.search.trim()) {
      list = list.filter((h) =>
        h.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location.trim()) {
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
    <div>
      {/* HERO SECTION */}
      <div
        className="h-72 bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h1 className="text-4xl font-bold drop-shadow-md">Find Your Perfect Home</h1>
        <p className="text-lg mt-2 drop-shadow-md">Search from verified listings</p>

        {/* SEARCH BAR */}
        <div className="bg-white w-2/3 mt-5 p-3 rounded-lg shadow flex gap-3">
          <input
            type="text"
            placeholder="Search title..."
            className="flex-1 border rounded px-3 py-2 text-black"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-40 border rounded px-3 py-2 text-black"
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />

          <button
            onClick={handleFilter}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-6xl mx-auto mt-8 p-4 bg-gray-50 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Filters</h2>

        <div className="flex flex-wrap gap-4">
          <input
            type="number"
            placeholder="Min Price"
            className="border rounded px-3 py-2"
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="border rounded px-3 py-2"
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />

          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-6xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

        {filtered.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">
            No properties match your search or filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((house) => (
              <HouseCard key={house._id} house={house} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
