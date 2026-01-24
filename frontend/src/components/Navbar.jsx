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
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            HouseFinder
          </Link>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-6">

            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link
              to="/ads"
              className={`hover:text-blue-600 ${
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

                {/* PROFILE DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setOpenProfile(!openProfile)}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={
                        user?.profilePic ||
                        `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`
                      }
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </button>

                  {openProfile && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setOpenProfile(false);
                          navigate("/my-listings");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        My Listings
                      </button>

                      <button
                        onClick={() => {
                          setOpenProfile(false);
                          navigate("/chat");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Chat
                      </button>

                      <hr />

                      <button
                        onClick={() => {
                          setOpenProfile(false);
                          setShowLogoutModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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

      {/* LOGOUT CONFIRM MODAL (UNCHANGED) */}
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
