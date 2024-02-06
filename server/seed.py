import random
from app import db, app 
from models import Restaurant, Pizza, RestaurantPizza

def seed_database():
    with app.app_context():
        # Delete all existing records
        db.session.query(RestaurantPizza).delete()
        db.session.query(Restaurant).delete()
        db.session.query(Pizza).delete()
        db.session.commit()

        # Seed the database with new records
        restaurants_data = [
            {"name": "Italiano Pizzeria", "address": "123 Main St"},
            {"name": "Mamma Mia's Pizza", "address": "456 Elm St"},
            {"name": "Pizza Palace", "address": "789 Oak St"},
            {"name": "Big Joe's Pizza", "address": "10 Maple Ave"},
            {"name": "Tony's Pizza", "address": "15 Pine St"},
            {"name": "Frankie's Pizzeria", "address": "20 Cedar Rd"},
            {"name": "Maria's Pizza", "address": "25 Cherry Ln"},
            {"name": "Luigi's Pizzeria", "address": "30 Elmwood Dr"},
            {"name": "Rocco's Pizza", "address": "35 Oakwood Ln"},
            {"name": "Giovanni's Pizza", "address": "40 Maplewood Ave"}
        ]
        pizzas_data = [
            {"name": "Margherita", "ingredients": "Tomato Sauce, Mozzarella, Basil"},
            {"name": "Pepperoni", "ingredients": "Tomato Sauce, Mozzarella, Pepperoni"},
            {"name": "Vegetarian", "ingredients": "Tomato Sauce, Mozzarella, Mushrooms, Bell Peppers, Onions"},
            {"name": "Supreme", "ingredients": "Tomato Sauce, Mozzarella, Pepperoni, Sausage, Mushrooms, Olives, Onions, Bell Peppers"},
            {"name": "Hawaiian", "ingredients": "Tomato Sauce, Mozzarella, Ham, Pineapple"},
            {"name": "Meat Lovers", "ingredients": "Tomato Sauce, Mozzarella, Pepperoni, Sausage, Bacon, Ham"},
            {"name": "BBQ Chicken", "ingredients": "BBQ Sauce, Mozzarella, Grilled Chicken, Red Onions, Cilantro"},
            {"name": "Buffalo Chicken", "ingredients": "Buffalo Sauce, Mozzarella, Grilled Chicken, Red Onions, Ranch Drizzle"},
            {"name": "Mushroom Lovers", "ingredients": "Tomato Sauce, Mozzarella, Mushrooms, Portobello Mushrooms, Truffle Oil"},
            {"name": "Four Cheese", "ingredients": "Tomato Sauce, Mozzarella, Provolone, Gorgonzola, Parmesan"}
        ]

        # Seed restaurants
        restaurants = []
        for data in restaurants_data:
            restaurant = Restaurant(name=data["name"], address=data["address"])
            db.session.add(restaurant)
            restaurants.append(restaurant)
        db.session.commit()

        # Seed pizzas
        pizzas = []
        for data in pizzas_data:
            pizza = Pizza(name=data["name"], ingredients=data["ingredients"])
            db.session.add(pizza)
            pizzas.append(pizza)
        db.session.commit()

        # Assign two random pizzas to each restaurant
        for restaurant in restaurants:
            selected_pizzas = random.sample(pizzas, 2)
            for pizza in selected_pizzas:
                restaurant_pizza = RestaurantPizza(
                    price=15.99,  # Set a default price
                    restaurant_id=restaurant.id,
                    pizza_id=pizza.id
                )
                db.session.add(restaurant_pizza)
        db.session.commit()

        print('Database seeded successfully.')

if __name__ == '__main__':
    seed_database()
