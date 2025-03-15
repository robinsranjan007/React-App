import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaClock } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const Tvshowdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    fetchTvShowDetails();
    if (userId) {
      fetchUserData();
    }
  }, [id]);

  const fetchTvShowDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      setTvShow(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
      setError("Failed to load TV show details.");
      setLoading(false);
    }
  };

  // ✅ Fetch User Data (Favorites & Watch Later)
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setFavorites(response.data.likedTvShows || []);
      setWatchLater(response.data.watchLaterTvShows || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ✅ Add TV Show to Favorites
  const addToFavorites = async () => {
    if (!userId) {
      alert("Please log in to save favorites.");
      return;
    }

    if (favorites.some((s) => s.id === tvShow.id)) {
      alert("This TV Show is already in your favorites.");
      return;
    }

    const updatedFavorites = [...favorites, { id: tvShow.id, title: tvShow.name, poster: tvShow.poster_path }];

    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, { likedTvShows: updatedFavorites });
      setFavorites(updatedFavorites); // ✅ Update UI immediately
      alert("TV Show added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // ✅ Add TV Show to Watch Later
  const addToWatchLater = async () => {
    if (!userId) {
      alert("Please log in to add to Watch Later.");
      return;
    }

    if (watchLater.some((s) => s.id === tvShow.id)) {
      alert("This TV Show is already in your Watch Later list.");
      return;
    }

    const updatedWatchLater = [...watchLater, { id: tvShow.id, title: tvShow.name, poster: tvShow.poster_path }];

    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, { watchLaterTvShows: updatedWatchLater });
      setWatchLater(updatedWatchLater); // ✅ Update UI immediately
      alert("TV Show added to Watch Later!");
    } catch (error) {
      console.error("Error adding to Watch Later:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-white text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-xl text-red-500">{error}</p>
        <button
          onClick={() => navigate("/tv-shows")}
          className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Back to TV Shows
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="relative w-full h-[500px]">
        <img
          src={tvShow.backdrop_path ? `${BACKDROP_BASE_URL}${tvShow.backdrop_path}` : "https://via.placeholder.com/1280x720?text=No+Image"}
          alt={tvShow.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">{tvShow.name}</h1>
        <p className="text-gray-400 mt-2">
          📅 First Air Date: {tvShow.first_air_date} | ⭐ {tvShow.vote_average} / 10
        </p>

        <p className="mt-4 text-lg">
          <strong>Genres:</strong> {tvShow.genres.map((g) => g.name).join(", ")}
        </p>

        <p className="mt-4 text-gray-300 leading-relaxed">{tvShow.overview}</p>

        <div className="mt-4 text-gray-400">
          <p>🎬 Status: {tvShow.status}</p>
          <p>📺 Number of Seasons: {tvShow.number_of_seasons}</p>
          <p>📅 Number of Episodes: {tvShow.number_of_episodes}</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center mt-6 space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={tvShow.poster_path ? `${IMAGE_BASE_URL}${tvShow.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={tvShow.name}
            className="w-64 h-auto rounded-lg"
          />

          <div>
            <a
              href={`https://www.themoviedb.org/tv/${tvShow.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg"
            >
              View on TMDb
            </a>
          </div>
        </div>

        {/* ✅ Favorite & Watch Later Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={addToFavorites}
            className={`flex items-center space-x-2 px-4 py-2 rounded text-white ${
              favorites.some((s) => s.id === tvShow.id) ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={favorites.some((s) => s.id === tvShow.id)}
          >
            <FaHeart /> <span>{favorites.some((s) => s.id === tvShow.id) ? "Added to Favorites" : "Add to Favorites"}</span>
          </button>

          <button
            onClick={addToWatchLater}
            className={`flex items-center space-x-2 px-4 py-2 rounded text-white ${
              watchLater.some((s) => s.id === tvShow.id) ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={watchLater.some((s) => s.id === tvShow.id)}
          >
            <FaClock /> <span>{watchLater.some((s) => s.id === tvShow.id) ? "Added to Watch Later" : "Watch Later"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tvshowdetails;
