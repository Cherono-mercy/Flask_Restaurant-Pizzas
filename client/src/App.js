import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './Components/RestaurantList';


import RestaurantDetails from './Components/RestaurantDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantList/>} />
        <Route path="/restaurants/:id" element={<RestaurantDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
