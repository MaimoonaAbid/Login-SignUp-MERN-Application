const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser=require('body-parser')
// Requiring and execute db.js to establish the database connection
require('./Configurations/db');


// Enabling CORS for all routes
app.use(bodyParser.json())
app.use(cors());

// Defining routes
const userRoutes = require('./Routes/user'); // Import your user routes

// Defining middleware to set the Content-Type header for JSON responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

app.use('/api/user', userRoutes); 


// Starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
