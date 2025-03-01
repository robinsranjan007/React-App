import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/user/home'; 
import Movies from '../pages/user/Movies';
import TvShows from '../pages/user/Tvshows';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup'
 

const RouterComponent = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Route */}
        <Route path="/movies" element={<Movies />} />  {/* Movies Route */}
        <Route path="/tv-shows" element={<TvShows />} />  {/* TV Shows Route */}
        <Route path="/login" element={<Login />} />  {/* TV Shows Route */}
        <Route path="/login" element={<Signup />} />  {/* TV Shows Route */}
      </Routes>
    );
  };

export default RouterComponent;
