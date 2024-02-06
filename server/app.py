from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, Restaurant, Pizza, RestaurantPizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

# Routes
# Index/Home endpoint
@app.route('/')
def index():
    return "Welcome to restaurants/pizzas API"

# GET /restaurants endpoint
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{'id': r.id, 'name': r.name, 'address': r.address} for r in restaurants])

# GET /restaurants/:id endpoint
@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        return jsonify({
            'id': restaurant.id,
            'name': restaurant.name,
            'address': restaurant.address,
            'pizzas': [{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in restaurant.pizzas]
        })
    else:
        return jsonify({'error': 'Restaurant not found'}), 404

# DELETE /restaurants/:id endpoint
@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        # Delete associated restaurant pizzas first
        RestaurantPizza.query.filter_by(restaurant_id=id).delete()
        # Then delete the restaurant itself
        db.session.delete(restaurant)
        db.session.commit()
        return '', 204
    else:
        return jsonify({'error': 'Restaurant not found'}), 404

# GET /pizzas endpoint
@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in pizzas])


# POST /restaurant_pizzas
@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.json
    price = data.get('price')
    pizza_id = data.get('pizza_id')
    restaurant_id = data.get('restaurant_id')

    # Check if the pizza name already exists in the restaurant's menu
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant and any(pizza.name == Pizza.query.get(pizza_id).name for pizza in restaurant.pizzas):
        return jsonify({'error': 'Pizza with the same name already exists in the menu.'}), 400

    restaurant_pizza = RestaurantPizza(price=price, pizza_id=pizza_id, restaurant_id=restaurant_id)
    if restaurant_pizza.validate():
        db.session.add(restaurant_pizza)
        db.session.commit()
        pizza = Pizza.query.get(pizza_id)
        return jsonify({'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients}), 201
    else:
        return jsonify({'errors': ['Validation errors']}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5555)
