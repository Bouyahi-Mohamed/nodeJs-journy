// import array of products from data/products.js
const cart = require("../data/cart.js");

// import validationCart
const { schemaDelete,schemaPatch,schemaPost } = require("../validations/cartVal.js");


// products api

//  creating controllers for Get all items in carts

/**
 * @disc Get all items in the cart
 * @returns {Array} - The list of items in the cart
 */

const getAllCartItems = (req, res) => {
    res.json(cart.viewCart());
}


// creating controllers for Get item by id in carts

/**
 * @disc Get  items in the carts by id
 * @param {string} id - The id of the item in the cart
 */


const getCartById = (req, res) => {
    const item = cart.viewCart().find(item => item.id === req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}

// post a new item to the cart
/**
 * @disc Post a new item to the cart
 * @param {Object} item - The item to add to the cart
 */

const addCartItem =  (req, res) => {
    const item = req.body;
    // Validate the item using the validation function
    const { error } = schemaPost.validate(item);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    cart.addToCart(item);
    res.status(201).json(item);
}

//  patch an quantity of an item in the cart
/**
 * @disc Patch an quantity of an item in the cart
 * @param {string} id - The id of the item in the cart
 * @param {number} quantity - The new quantity of the item in the cart
 */
const patchCartItem = (req, res) => {
    const { id, quantity } = req.body;
    // Validate the item using the validation function
    const { error } = schemaPatch.validate({ id, quantity });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const item = cart.viewCart().find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}
//  delete an item from the cart
/**
 * @disc Delete an item from the cart
 * @param {string} id - The id of the item to delete from the cart

 */
const deleteCartItem =  (req, res) => {
    const { id } = req.body;
    // Validate the id using the validation function
    const { error } = schemaDelete.validate({ id });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const removed = cart.removeFromCart(id);
        if (removed) {
            res.status(200).json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}

module.exports = {
    getAllCartItems,
    getCartById,
    addCartItem,
    patchCartItem,
    deleteCartItem
}
