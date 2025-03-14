import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeTopSection from "./HomeTopSection"; // Import the top section

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TMDb API Key from .env
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // High-quality images

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies("popular"); // Default: Fetch popular movies
  }, []);

  // Fetch movies based on user search or default categories
  const fetchMovies = (query) => {
    const url =
      query === "popular"
        ? `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results);
        } else {
          setMovies([]);
          console.error("TMDb API Error:", response.data.status_message);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return; // Prevent empty searches
    fetchMovies(searchQuery);
  };

  return (
    <div className="p-6">
      {/* Home Top Section - Movie Carousel */}
      <HomeTopSection />

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for movies..."
          className="p-2 rounded-l-md w-1/3 bg-gray-800 text-white outline-none"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 text-white rounded-r-md hover:bg-blue-700">
          Search
        </button>
      </form>

      {/* Default Movie Grid */}
      <div className="grid grid-cols-3 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg text-white shadow-lg">
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
              <p className="text-gray-400 text-sm">⭐ {movie.vote_average.toFixed(1)} / 10</p>
              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {movie.overview ? movie.overview : "No description available."}
              </p>
              <Link
                to={`/movies/${movie.id}`}
                className="mt-2 bg-blue-600 hover:bg-blue-700 p-2 rounded w-full block text-center"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-3">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
