## Flask-Restaurant-Pizza
# By Cherono Mercy 06/02/2024
# Project Description
This project is a web application for managing restaurants and their pizza menus. It consists of both a frontend and a backend component.

## Frontend
The front end of the project is built using React.js, a popular JavaScript library for building user interfaces.

# Requirements
 - Node.js (v14.x or higher)
 - npm (v6.x or higher)
   
# Installation
1. Clone the repository:
git clone https://github.com/your-username/restaurant-pizzas.git
2. Navigate to the frontend directory:
cd restaurant-pizzas/client
3. Install dependencies:
npm install

# Running the Frontend
To start the frontend server, run:
npm start
This will start the development server and open the application in your default web browser.

## Backend
The backend of the project is built using Flask, a lightweight Python web framework.

# Requirements
Python (v3.7 or higher)
pip (Python package manager)

# Installation
1. Navigate to the backend directory:
cd restaurant-pizzas/server
2. Create a virtual environment (optional but recommended):
pipenv --python 3.10 install
3. Activate the virtual environment:
- On Windows:
venv\Scripts\activate
- On macOS and Linux:
  source venv/bin/activate
4. Install dependencies:
pip install -r requirements.txt

# Seed the database
To add records to the database, run:
python seed.py

# Running the Backend/ Server side
To start the backend server, run:
flask run
This will start the Flask development server.

## Interacting with the Application
Once both the frontend and backend servers are running, you can interact with the application by accessing the provided URLs in your web browser.

- Frontend: http://localhost:3000
- Backend: http://localhost:5555

## Additional Notes
Make sure both frontend and backend servers are running simultaneously to use the application effectively.
Customize the project as needed to fit your requirements


