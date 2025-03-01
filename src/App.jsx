import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
 import Header from './layouts/navbar/header'; // Import Header component
import RouterComponent from './routes/Router';  // Import Router component

const App = () => {
  return (
    <Router>
      <div>
        <Header /> {/* This will be displayed on all pages */}
        <RouterComponent /> {/* Routing handled here */}
      </div>
    </Router>
  );
};

export default App;
