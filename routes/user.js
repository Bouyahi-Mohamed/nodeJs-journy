// import frameworks 'express';
const express = require("express");

// import routes form express
const routes = express.Router();
// we use routes to define our API endpoints instead of app.get

// import controllers
const { registerUser,loginUser} = require("../controllers/userController.js");

// user api

/**
 * @desc Register a new user
 * @route POST /register
 * @access Public
 * @returns {Object} Newly created user object
 */

routes.post("/register", registerUser);

/**
 * @desc Login a user
 * @route POST /login
 * @access Public
 * @returns {Object} Logged in user object
 */
routes.post("/login", loginUser);

// export the routes
module.exports = routes;
// we need to export the routes so they can be used in other parts of the application.  
