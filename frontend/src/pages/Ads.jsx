import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";


export default function Ads() {

  const navigate = useNavigate();

  const [houses, setHouses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // Store carousel image index per house
  const [imageIndex, setImageIndex] = useState({});

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch houses
  useEffect(() => {
    api
      .get("/houses")
      .then((res) => {
        setHouses(res.data);
        setFiltered(res.data);

        // Initialize image index for each house
        const initialIndexes = {};
        res.data.forEach((h) => {
          initialIndexes[h._id] = 0;
        });
        setImageIndex(initialIndexes);
      })
      .catch((err) => console.log(err));
  }, []);

  // Format price
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN").format(Number(value));

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Filter logic
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

  // carousel navigation
  const nextImage = (id, total) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] === total - 1 ? 0 : prev[id] + 1,
    }));
  };

  const prevImage = (id, total) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? total - 1 : prev[id] - 1,
    }));
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 flex gap-10">
      
      {/* LEFT FILTER PANEL */}
      <div className="w-64 bg-white shadow-md rounded-xl p-5 h-fit">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <label className="block text-sm font-medium">Location</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3"
          placeholder="Search location"
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />

        <label className="block text-sm font-medium">Price Range</label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="border w-full px-2 py-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="border w-full px-2 py-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>

        <button
          onClick={applyFilters}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* RIGHT LISTINGS */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">
          {filtered.length} Properties
        </h2>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-lg mt-10">
            ❌ No properties match your search.
          </p>
        )}

        {filtered.map((house) => {
          const currentImage = imageIndex[house._id] || 0;

          return (
            <div
  key={house._id}
  onClick={() => navigate(`/house/${house._id}`)}
  className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-4 mb-8 cursor-pointer"
>

              <div className="flex gap-6 items-start">

                {/* IMAGE CAROUSEL */}
                <div className="relative w-64 h-44 bg-gray-100 rounded-lg overflow-hidden shadow-md group">
                  
                  <img
                    src={house.images[currentImage]}
                    alt="house"
                    className="w-full h-full object-contain transition-all duration-300"
                  />

                  {/* Only show carousel controls if >1 image */}
                  {house.images.length > 1 && (
                    <>
                      {/* LEFT ARROW */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(house._id, house.images.length);
                        }}
                        className="
                          absolute left-2 top-1/2 -translate-y-1/2 
                          bg-white/40 backdrop-blur-sm hover:bg-white/80 
                          p-1.5 rounded-full shadow text-sm 
                          opacity-0 group-hover:opacity-100 transition
                        "
                      >
                        ←
                      </button>

                      {/* RIGHT ARROW */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(house._id, house.images.length);
                        }}
                        className="
                          absolute right-2 top-1/2 -translate-y-1/2 
                          bg-white/40 backdrop-blur-sm hover:bg-white/80 
                          p-1.5 rounded-full shadow text-sm 
                          opacity-0 group-hover:opacity-100 transition
                        "
                      >
                        →
                      </button>

                      {/* DOT INDICATORS */}
                      <div
                        className="
                          absolute bottom-1 w-full flex justify-center gap-1 
                          opacity-0 group-hover:opacity-100 transition
                        "
                      >
                        {house.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition ${
                              currentImage === index
                                ? "bg-blue-600 scale-110"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* VERTICAL DIVIDER */}
                <div className="w-px bg-gray-300"></div>

                {/* TEXT CONTENT */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{house.title}</h2>
                  <p className="text-gray-600 text-sm">{house.location}</p>

                  <p className="text-green-600 font-bold mt-1">
                    ₹ {formatPrice(house.price)}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 👈 THIS IS THE FIX
                      toggleExpand(house._id);
                    }}
                    className="text-blue-600 mt-2 hover:underline"
                  >
                    {expanded === house._id ? "Hide Details ↑" : "View Details ↓"}
                  </button>

                </div>
              </div>

              {/* EXPANDABLE DETAILS */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  expanded === house._id ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <div className="bg-gray-50 rounded-lg shadow-inner p-4 space-y-3">
  <p className="text-gray-700">{house.description}</p>

  <p className="text-sm">
    <strong>Owner:</strong> {house.ownerName}
  </p>

  <p className="text-sm">
    <strong>Phone:</strong> {house.ownerPhone}
  </p>

  {/* CHAT WITH OWNER */}

  {user?.id !== house.owner &&
  (<button
    onClick={async () => {
      try {
        const res = await api.post("/chat/start", {
          houseId: house._id,
        });
        navigate(`/chat/${res.data._id}`);
      } catch (err) {
        alert("Please login to chat with owner");
      }
    }}
    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Chat with Owner
  </button>
        )}
</div>


              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
