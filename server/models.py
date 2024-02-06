from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    pizzas = db.relationship('Pizza', secondary='restaurant_pizza')

class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(200), nullable=False)
    restaurants = db.relationship('Restaurant', secondary='restaurant_pizza')

class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    restaurant = db.relationship('Restaurant')
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)
    pizza = db.relationship('Pizza', overlaps="pizzas,restaurants")

    # Validation
    def validate(self):
        try:
            price_as_int = int(self.price)
            return 1 <= price_as_int <= 30
        except ValueError:
            return False
