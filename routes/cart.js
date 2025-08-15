// import array of products from data/products.js
const cart = require("../data/cart.js");

// import frameworks 'express';
const express = require("express");

// import routes form express
const routes = express.Router();
// we use routes to define our API endpoints instead of app.get



// products api
// creating api a route for cart
/**
 * @disc Get all items in the cart
 * @route GET /cart
 * @access public
 * @returns {Array} - The list of items in the cart
 */
routes.get('/:id', (req, res) => {
    const item = cart.viewCart().find(item => item.id === req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


// creating api a route for cart
/**
 * @disc Get all items in the cart
 * @route GET /cart
 * @access public
 * @returns {Array} - The list of items in the cart
 */


routes.get('/', (req, res) => {
    res.json(cart.viewCart());
});
/**
 * @disc post a new item to the cart
 * @route POST /cart
 * @access public
 * @returns {Object} - The added item
 */

routes.post('/', (req, res) => {
    const item = req.body;
    cart.addToCart(item);
    res.status(201).json(item);
});
/**
 * @disc delete an item from the cart
 * @route DELETE /cart
 * @access public
 * @returns {Object} - The removed item
 */
routes.delete('/', (req, res) => {
    const item = req.body;
    cart.removeFromCart(item);
    res.status(204).end();
});

/**
 * @disc patch an quantity of an item in the cart
 * @route PATCH /cart
 * @access public
 * @returns {Object} - The updated item
 */
routes.patch('/', (req, res) => {
    const { id, quantity } = req.body;
    const item = cart.viewCart().find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = routes;
// we need to export the routes so they can be used in other parts of the application.
