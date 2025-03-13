import { FaHome, FaFilm, FaTv, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const Header = () => {
  // Retrieve the username from localStorage
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('userId');  // Remove user ID if you're storing it too
    
    // Redirect to login page after logging out
    navigate('/login');
  };

  return (
    <nav className="bg-black bg-opacity-70 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="text-white font-bold text-lg">
          Flix<span className="text-red-500">Net</span>
        </div>

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
        <div className="relative group ml-auto">
          {/* User Icon */}
          <FaUserCircle className="text-white text-3xl cursor-pointer group-hover:text-red-400" />

          {/* Dropdown Menu (Shows on Hover) */}
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {username ? (
              <>
                {/* Show My Profile if logged in */}
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-black hover:bg-gray-200">
                  My Profile
                </Link>
                {/* Logout Option */}
                <div 
                  onClick={handleLogout}
                  className="block px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  Logout
                </div>
              </>
            ) : (
              <>
                {/* Show Login & Admin only if not logged in */}
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-black hover:bg-gray-200">
                  Login
                </Link>
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-black hover:bg-gray-200">
                  Admin
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Display username or "User" if not logged in */}
        <span className="ml-2 text-white">{username || "User"}</span>
      </div>
    </nav>
  );
};

export default Header;
