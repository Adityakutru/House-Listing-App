import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-5 rounded-lg shadow">
          <h2 className="font-semibold text-lg">My Listings</h2>
          <p className="text-gray-600">View and manage your posted houses.</p>
          <Link className="text-blue-600" to="/my-listings">Go →</Link>
        </div>

        <div className="border p-5 rounded-lg shadow">
          <h2 className="font-semibold text-lg">Add New Listing</h2>
          <p className="text-gray-600">Post a new house to the marketplace.</p>
          <Link className="text-blue-600" to="/add-house">Add →</Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
