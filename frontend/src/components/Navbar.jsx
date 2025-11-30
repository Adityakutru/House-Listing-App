import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm py-4 px-6 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HouseFinder
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className={`text-gray-700 hover:text-blue-600 ${
              location.pathname === "/" ? "font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/add"
            className={`px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 ${
              location.pathname === "/add" ? "bg-blue-700" : ""
            }`}
          >
            Add Listing
          </Link>
        </div>
      </div>
    </nav>
  );
}

