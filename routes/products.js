// import array of products from data/products.js
const allProduct = require('../data/products.js')

// importe framewoks 'express';
const express = require('express');

// import routes form express
const routes = express.Router();
// we use routes to define our API endpoints instead of app.get


// products api
    // routes get all products
/**
 * @desc Get all products
 * @route GET /products
 * @access Public
 * @returns {Array} List of products
 */

routes.get('/', (req, res) => {
  res.json(allProduct);
});

// routes get product by id
/**
 * @desc Get product by id
 * @route GET /products/:id
 * @access Public
 * @returns {Object} Product object
 */

routes.get('/:id', (req, res) => {
    const product = allProduct.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});


module.exports = routes;
// we need to export the routes so they can be used in other parts of the application.