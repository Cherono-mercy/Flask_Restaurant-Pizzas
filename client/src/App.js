import React from 'react';
import './App.css';
import './restaurantlist.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import PizzaList from './components/PizzaList';

import RestaurantDetails from './components/RestaurantDetails';

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
