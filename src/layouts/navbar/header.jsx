import { FaHome, FaFilm, FaTv, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Header = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-black bg-opacity-70 p-4 shadow-lg relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-lg">
          Flix<span className="text-red-500">Net</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 ml-20">
          <Link to="/" className="text-white hover:text-red-400">
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link to="/movies" className="text-white hover:text-red-400">
            <FaFilm className="inline mr-2" /> Movies
          </Link>
          <Link to="/tv-shows" className="text-white hover:text-red-400">
            <FaTv className="inline mr-2" /> TV Shows
          </Link>
        </div>

        {/* Profile Icon & Dropdown */}
        <div className="relative ml-auto">
          {/* ✅ Clickable Profile Icon */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white text-3xl cursor-pointer focus:outline-none"
          >
            <FaUserCircle />
          </button>

          {/* ✅ Dropdown (Shows when dropdownOpen is true) */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 min-w-[160px] bg-white shadow-lg rounded-lg z-50">
              {username ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 text-black hover:bg-gray-200">
                    My Profile
                  </Link>
                  <Link to="/favorites" className="block px-4 py-2 text-black hover:bg-gray-200">
                    Favorites
                  </Link>
                  <Link to="/watchlater" className="block px-4 py-2 text-black hover:bg-gray-200">
                    Watch Later
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-black hover:bg-gray-200">
                    Login
                  </Link>
                  <Link to="/signup" className="block px-4 py-2 text-black hover:bg-gray-200">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Display Username */}
        <span className="ml-2 text-white">{username || "User"}</span>
      </div>
    </nav>
  );
};

export default Header;
