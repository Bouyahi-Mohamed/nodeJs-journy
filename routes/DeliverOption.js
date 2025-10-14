// import frameworks 'express';
const express = require("express");

// import routes form express
const routes = express.Router();
// we use routes to define our API endpoints instead of app.get

// import controllers for deliverOptions
const { getAllDeliverOptions } = require("../controllers/DeliverOptionController.js");

// creating api a route for deliverOptions
// DeliverOptions api
   // creating api a route for deliverOptions

/**
 * @disc Get all items in the deliverOptions
 * @route GET /deliverOptions
 * @access public
 * @returns {Array} - The list of items in the deliverOptions
 */

routes.get('/', getAllDeliverOptions);

// Export the routes
module.exports = routes;
