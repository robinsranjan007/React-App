import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/HomePage/Home";
import Movies from "../pages/user/movies/Movies";
import MoviesDetails from "../pages/Details/Moivesdetails";
import TvShows from "../pages/user/Tvshows/Tvshows";
import Tvshowdetails from "../pages/Details/Tvshowdetails";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import MyProfile from "../pages/Auth/myprofile/Myprofile";
import Favorites from "../pages/user/Favorite/Favorites"; // ✅ Correct import for Favorites
import WatchLater from "../pages/user/Watchlater/Watchlater"; // ✅ Correct import for Watch Later
import Movieslist from "../pages/admin/Movieslist";
import Tvshowlists from "../pages/admin/Tvshowlists";
import Userslist from "../pages/admin/Userslists";

const RouterComponent = ({ isAdmin }) => {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MoviesDetails />} />
      <Route path="/tv-shows" element={<TvShows />} />
      <Route path="/tv-shows/:id" element={<Tvshowdetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/favorites" element={<Favorites />} /> {/* ✅ Correct Favorites Route */}
      <Route path="/watchlater" element={<WatchLater />} /> {/* ✅ Correct Watch Later Route */}

      {/* ✅ Admin Routes */}
      {isAdmin && (
        <>
          <Route path="/movieslist" element={<Movieslist />} />
          <Route path="/tvshowslists" element={<Tvshowlists />} />
          <Route path="/userslist" element={<Userslist />} />
        </>
      )}
    </Routes>
  );
};

export default RouterComponent;
