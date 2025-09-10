

// import frameworks 'express';
const express = require("express");

// import routes form express
const routes = express.Router();
// we use routes to define our API endpoints instead of app.get

// import controllers
const { getProducts, getProductById,addProducts } = require("../controllers/productsController.js");

// products api
// routes get all products

/**
 * @desc Get all products
 * @route GET /products
 * @access Public
 * @returns {Array} List of products
 */

routes.get("/", getProducts);

// routes get product by id
/**
 * @desc Get product by id
 * @route GET /products/:id
 * @access Public
 * @returns {Object} Product object
 */

routes.get("/:id", getProductById);


// add all products
/**
 * @desc Add all products
 * @route POST /products
 * @access Public
 * @returns {Object} Created product object
 */

routes.post("/", addProducts);

// export the routes
module.exports = routes;
// we need to export the routes so they can be used in other parts of the application.
