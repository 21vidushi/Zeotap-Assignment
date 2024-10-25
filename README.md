Zeotap Assignment - Project Documentation
1. Rule Engine with Abstract Syntax Tree (AST)
Overview
This project involves developing a Rule Engine using Abstract Syntax Trees (AST) to determine user eligibility based on dynamic conditions such as age, department, income, and spend. The frontend offers a simple interface, while the backend provides robust functionality for storing and processing rules.

Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Key Features
User-friendly interface for inputting and managing conditional rules.
AST-based evaluation mechanism to analyze and apply user-specific rules.
MongoDB used for efficiently storing large amounts of rule and user data.
Setup and Instructions
Environment Configuration:

Ensure you have a .env file with your MongoDB connection string (example: MONGODB_URL=your-mongodb-url).
Backend Setup:

Navigate to the project directory in your terminal.
Run npm install to install all dependencies.
Start the backend server using:
bash
Copy code
npm start
The server should now be running on the specified port (defined in your .env).
Frontend Setup:

Open the index.html file in your browser to access the application interface.
Alternatively, you can use the Go Live feature in VS Code to launch the frontend.

2. Weather Monitoring App
Overview
The Weather Monitoring App allows users to access and monitor weather conditions in various locations. The frontend displays real-time weather data fetched using an API, while the backend securely manages user information and authentication.

Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
External APIs: OpenWeather API for fetching weather data

Key Features
Displays real-time weather data for different locations.
Secure user authentication using JWT.
Integration with external weather APIs to fetch accurate weather details.

Setup and Instructions
Environment Configuration:

Create a .env file with the following variables:
makefile
Copy code
PORT=4000
MONGODB_URL="mongodb+srv://<your-username>:<your-password>@test.ema1dhe.mongodb.net/Zeotap-2"
JWT_SECRET=<your-jwt-secret>
CLOUD_NAME=<your-cloudinary-cloud-name>
OpenWeatherApiKey=<your-openweather-api-key>
API_KEY=<your-cloudinary-api-key>
API_SECRET=<your-cloudinary-api-secret>
MAIL_HOST=smtp.gmail.com
MAIL_USER=<your-email>
MAIL_PASS=<your-email-password>
Backend Setup:

Navigate to the project directory in your terminal.
Run npm install to install dependencies.
Start the backend server using:
bash
Copy code
npm start
The server should be running on port 4000 (or as specified in your .env file).
Frontend Setup:

The frontend code is located in the frontend folder.
Open the index.html file in your browser to access the user interface.
Additional Information
Authentication: The app uses JWT (JSON Web Tokens) for secure authentication.
Email Configuration: Set up using SMTP for sending notifications or alerts.
