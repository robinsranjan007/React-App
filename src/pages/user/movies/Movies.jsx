import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// ✅ Genre Mapping from TMDb API
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const totalPages = 25; // ✅ Fetching 25 pages (500 movies)

  useEffect(() => {
    fetchMovies();
  }, [sortBy, genre, searchQuery]);

  // ✅ Fetch 25 Pages (500 Movies)
  const fetchMovies = async () => {
    let allMovies = [];

    for (let i = 1; i <= totalPages; i++) {
      const apiUrl =
        sortBy === "trending"
          ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${i}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${i}`;

      const response = await axios.get(apiUrl);
      allMovies = [...allMovies, ...response.data.results];
    }

    setMovies(allMovies);
    applyFilters(allMovies);
  };

  // ✅ Apply Filters (Search & Genre)
  const applyFilters = (movieList = movies) => {
    let filtered = movieList;

    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (genre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(parseInt(genre))
      );
    }

    setFilteredMovies(filtered);
    setPage(1);
  };

  // ✅ Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("trending");
    setGenre("");
    fetchMovies(); // ✅ Reload movies after reset
  };

  // ✅ Pagination (20 movies per page)
  const moviesPerPage = 20;
  const totalPagesAvailable = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  const nextPage = () => {
    if (page < totalPagesAvailable) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        searchQuery={searchQuery}
        handleSearch={(e) => setSearchQuery(e.target.value)}
        setGenre={setGenre}
        handleSortChange={(e) => setSortBy(e.target.value)}
        resetFilters={resetFilters}
      />

      {/* Movies Display */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold">Movies</h1>

          {/* ✅ Reset Button */}
          <button
            onClick={resetFilters}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset Filters
          </button>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {currentMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg text-white shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {/* Movie Poster */}
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-80 object-cover rounded-md"
              />

              {/* Movie Details */}
              <div className="p-2">
                <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm">⭐ {movie.vote_average}</p>
                <p className="text-gray-300 text-sm">
                  🎭 {movie.genre_ids.map((id) => genreMap[id] || "Unknown").join(", ")}
                </p>

                {/* View Details Button */}
                <Link
                  to={`/movies/${movie.id}`}
                  className="mt-2 block text-center bg-red-600 hover:bg-red-700 p-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-4 items-center">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={`px-4 py-2 text-white rounded ${
              page === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            ❮ Previous
          </button>

          {/* ✅ Page Number Input */}
          <span className="text-white text-lg">
            Page{" "}
            <input
              type="number"
              value={page}
              onChange={(e) => {
                const newPage = parseInt(e.target.value);
                if (newPage > 0 && newPage <= totalPagesAvailable) {
                  setPage(newPage);
                }
              }}
              className="w-12 text-center text-black rounded p-1"
            />{" "}
            of {totalPagesAvailable}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPagesAvailable}
            className={`px-4 py-2 text-white rounded ${
              page === totalPagesAvailable ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Next ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
