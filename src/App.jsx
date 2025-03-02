import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layouts/navbar/header';  
import RouterComponent from './routes/Router';   
import Sidenavbar from './layouts/sidenavbar/sidenavbar';

const App = () => {
  // State to track whether the user is an admin
  const [isAdmin, setIsAdmin] = useState(false); // Set to true or false based on your user authentication logic
  
  return (
    <Router>
      <div>
        {/* Conditionally render Header only if user is NOT an admin */}
        {!isAdmin && <Header />}

        {/* Conditionally render Sidenavbar if user is an admin */}
        {isAdmin && <Sidenavbar />}

        <RouterComponent isAdmin={isAdmin} />
      </div>
    </Router>
  );
};

export default App;
