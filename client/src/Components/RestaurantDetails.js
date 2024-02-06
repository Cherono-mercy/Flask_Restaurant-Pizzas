import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [price, setPrice] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Restaurant not found');
        }
        return response.json();
      })
      .then(data => setRestaurant(data))
      .catch(error => {
        console.error('Error fetching restaurant details:', error);
        navigate('/'); // Redirect to home page if restaurant not found
      });

    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, [id, navigate]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  function handleAddPizza(e) {
    e.preventDefault();
  
    // Check if the selected pizza name already exists in the restaurant's menu
    const selectedPizzaName = pizzas.find(pizza => pizza.id === selectedPizza)?.name;
    const isPizzaNameExists = restaurant.pizzas.some(pizza => pizza.name === selectedPizzaName);
  
    // Check if the price is within the valid range (1 to 30)
    const isValidPrice = price >= 1 && price <= 30;
  
    if (isPizzaNameExists || !isValidPrice) {
      let errorMessage = '';
      if (isPizzaNameExists) {
        errorMessage += 'Pizza with the same name already exists in the menu.\n';
      }
      if (!isValidPrice) {
        errorMessage += 'Price must be between 1 and 30.\n';
      }
      
      // Use a prompt window to inform the user of the error(s)
      window.alert(errorMessage.trim());
      // Clear the form inputs for the user to input correct data
      setPrice('');
      setSelectedPizza('');
      return; // Exit the function without further execution
    }
  
    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: price,
        pizza_id: selectedPizza,
        restaurant_id: id
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add pizza to restaurant');
      }
      return response.json();
    })
    .then(newPizza => {
      setRestaurant(prevRestaurant => ({
        ...prevRestaurant,
        pizzas: [...prevRestaurant.pizzas, newPizza]
      }));
      setPrice('');
      setSelectedPizza('');
    })
    .catch(error => console.error('Error adding pizza to restaurant:', error));
  }
  
  
    

  function handleDeleteRestaurant() {
    setShowConfirmationDialog(true);
  }

  function confirmDeleteRestaurant() {
    fetch(`/restaurants/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete restaurant');
      }
      navigate('/'); // Redirect to home page after deleting restaurant
    })
    .catch(error => console.error('Error deleting restaurant:', error));
  }

  return (
    <div className="restaurant-details-container">
      <h1 className="restaurant-name">{restaurant.name}</h1>
      <p className="restaurant-address"><strong>Address:</strong> {restaurant.address}</p>
      <h2>Pizzas Menu</h2>
      <ul className="pizza-menu">
        {restaurant.pizzas.map(pizza => (
          <li key={pizza.id} className="pizza-item">
            <h3 className="pizza-name">{pizza.name}</h3>
            <p className="pizza-ingredients">{pizza.ingredients}</p>
          </li>
        ))}
      </ul>
      <h2>Add Pizza</h2>
      <form className="add-pizza-form" onSubmit={handleAddPizza}>
        <select value={selectedPizza} onChange={e => setSelectedPizza(e.target.value)}>
          <option value="">Select a pizza</option>
          {pizzas.map(pizza => (
            <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
          ))}
        </select>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
        <button type="submit" className="add-pizza-button">Add Pizza</button>
      </form>
      <button className="delete-restaurant-button" onClick={handleDeleteRestaurant}>Delete Restaurant</button>
      <Link className="back-to-restaurants-link" to="/">Back to Restaurants</Link>
      {showConfirmationDialog && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this restaurant?</p>
          <button onClick={confirmDeleteRestaurant}>Yes</button>
          <button onClick={() => setShowConfirmationDialog(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default RestaurantDetails;
