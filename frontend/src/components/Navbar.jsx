import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          HouseFinder
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          
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
              <Link to="/add-house" className="px-4 py-2 bg-blue-600 text-white rounded">
                Add Listing
              </Link>

              <Link to="/my-listings">My Listings</Link>

              <Link to="/owner-dashboard">Dashboard</Link>

              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link to="/login" className="">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
