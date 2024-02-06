// RestaurantList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div className="restaurant-list">
      <h1>Restaurants</h1>
      <div className="restaurant-cards">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <Link to={`/restaurants/${restaurant.id}`} className="view-details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
