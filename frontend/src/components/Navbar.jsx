import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <Link to="/" className="text-2xl font-bold text-blue-600">
            HouseFinder
          </Link>

          <div className="flex items-center gap-6">

            {/* Home */}
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            {/* Ads */}
            <Link
              to="/ads"
              className={`text-gray-700 hover:text-blue-600 ${
                location.pathname === "/ads" ? "font-semibold" : ""
              }`}
            >
              Ads
            </Link>

            {token && (
              <>
                <Link
                  to="/add-house"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add Listing
                </Link>

                <Link to="/my-listings">My Listings</Link>

                <Link to="/owner-dashboard">Dashboard</Link>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-red-600 font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}

            {!token && (
              <>
                <Link to="/login">Login</Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setShowLogoutModal(false);
                  navigate("/login");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
