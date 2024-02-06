import React, { useState } from 'react';

function AddPizzaForm({ restaurants, pizzas }) {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to add pizza');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        // Optionally, update state or show success message
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </label>
        <label>
          Pizza:
          <select name="pizza_id" value={formData.pizza_id} onChange={handleInputChange}>
            <option value="">Select Pizza</option>
            {pizzas.map(pizza => (
              <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
            ))}
          </select>
        </label>
        <label>
          Restaurant:
          <select name="restaurant_id" value={formData.restaurant_id} onChange={handleInputChange}>
            <option value="">Select Restaurant</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
}

export default AddPizzaForm;
