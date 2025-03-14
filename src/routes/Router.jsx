import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/user/HomePage/Home'; 
import Movies from '../pages/user/Movies';
import TvShows from '../pages/user/Tvshows';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import MyProfile from '../pages/Auth/myprofile/Myprofile';  // Import the profile page
import Movieslist from '../pages/admin/Movieslist';
import Tvshowlists from '../pages/admin/Tvshowlists';
import Userslist from '../pages/admin/Userslists';

const RouterComponent = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/movies" element={<Movies />} /> 
      <Route path="/tv-shows" element={<TvShows />} />  
      <Route path="/login" element={<Login />} />   
      <Route path="/signup" element={<Signup />} />  
      <Route path="/profile" element={<MyProfile />} />  {/* Add profile route */}

      {/* Conditionally render admin routes if the user is an admin */}
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
