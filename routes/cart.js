

// import frameworks 'express';
const express = require("express");

// import routes form express
const routes = express.Router();
// we use routes to define our API endpoints instead of app.get

// import controllers for cart
const { getAllCartItems, getCartById, addCartItem ,deleteCartItem,patchCartItem,putCartItem} = require("../controllers/cartsController.js");

// im

// creating api a route for cart
// Cart api
   // creating api a route for cart

/**
 * @disc Get all items in the cart
 * @route GET /cart
 * @access public
 * @returns {Array} - The list of items in the cart
 */

routes.get('/', getAllCartItems);


/**
 * @disc Get  items in the cart by id
 * @route GET /cart/:id
 * @access public
 * @returns {Object} - The item in the cart
 */
routes.get('/:id', getCartById);



/**
 * @disc post a new item to the cart
 * @route POST /cart
 * @access public
 * @returns {Object} - The added item
 */

routes.post('/', addCartItem);
/**
 * @disc delete an item from the cart
 * @route DELETE /cart
 * @access public
 * @returns {Object} - The removed item
 */
routes.delete('/', deleteCartItem);

/**
 * @disc patch an quantity of an item in the cart
 * @route PATCH /cart
 * @access public
 * @returns {Object} - The updated item
 */
routes.patch('/', patchCartItem);

/**
 * @disc put an quantity of an item in the cart
 * @route PUT /cart
 * @access public
 * @returns {Object} - The updated item
 */
routes.put('/', putCartItem);

// export the routes
module.exports = routes;
// we need to export the routes so they can be used in other parts of the application.
