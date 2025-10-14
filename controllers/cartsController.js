// old using array // import array of products from data/products.js
// const cart = require("../data/cart.js");

// new using database // import cart model because we will interact with the cart collection in the mongodb database
const Cart = require("../models/cart.js");

// import validationCart
const { schemaDelete,schemaPatch,schemaPost,schemaPut } = require("../validations/cartVal.js");


// products api

//  creating controllers for Get all items in carts

/**
 * @disc Get all items in the cart
 * @returns {Array} - The list of items in the cart
 */

const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('product').populate('deliveryOption');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// creating controllers for Get item by id in carts

/**
 * @disc Get  items in the carts by id
 * @param {string} id - The id of the item in the cart
 */


const getCartById = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id).populate('product');
        // const item = await Cart.findById(req.params.id).populate('product' ,['name', 'priceCents', 'image']); // to get specific fields
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// post a new item to the cart
/**
 * @disc Post a new item to the cart
 * @param {Object} item - The item to add to the cart
 */

const addCartItem =  async (req, res) => {
    try {
        const item = req.body;
       // Validate the item using the validation function
        const { error } = schemaPost.validate(item);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const existingItem = await Cart.findOne({ product: item.product });
        if (existingItem) {
            if (existingItem.quantity + item.quantity > 100) {
                return res.status(400).json({ message: 'Quantity exceeds the maximum limit of 100' });
            }
            if (!item.quantity) {
                existingItem.quantity += 1;
            } else {
                existingItem.quantity += item.quantity;
            }
            await existingItem.save();
            const populatedItem = await existingItem.populate('product');
            return res.status(200).json(populatedItem);
        }
        const newItem = new Cart(item);
        await newItem.save();
        const populatedNewItem = await newItem.populate('product');
        res.status(201).json(populatedNewItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

//  patch an quantity of an item in the cart
/**
 * @disc Patch an quantity of an item in the cart
 * @param {string} id - The id of the item in the cart
 * @param {number} quantity - The new quantity of the item in the cart
 */
const patchCartItem = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        // Validate the item using the validation function
        const { error } = schemaPatch.validate({ id, quantity });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const item = await Cart.findById(id);
        // const item = await Cart.findByIdAndUpdate(id, { quantity }, { new: true }); you can also use this method to update the quantity without saving
        if (item) {
            item.quantity = quantity;
            await item.save();
            // const item = await Cart.findByIdAndUpdate(id, { quantity }, { new: true }); you can also use this method to update the quantity without saving
            const populatedItem = await item.populate('product');
            res.json(populatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//  put an quantity of an item in the cart
/**
 * @disc Put an quantity of an item in the cart
 * @param {string} id - The id of the item in the cart
 * @param {number} quantity - The new quantity of the item in the cart
 */
// put change all the item fields
const putCartItem = async (req, res) => {
    try {
        const { id, product, quantity } = req.body;
        // Validate the item using the validation function
        const { error } = schemaPut.validate({ id, product, quantity });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const item = await Cart.findByIdAndUpdate(id, { product, quantity }, { new: true }).populate('product');
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//  delete an item from the cart
/**
 * @disc Delete an item from the cart
 * @param {string} id - The id of the item to delete from the cart

 */
const deleteCartItem =  async (req, res) => {
    try{
        const { id } = req.body;
        // Validate the item using the validation function
        const { error } = schemaDelete.validate({ id });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const removed = await Cart.findByIdAndDelete(id);
        if (removed) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
        }
// modify deliverOption in the cart item
/**
 * @disc Patch an deliveryOption of an item in the cart
 * @param {string} id - The id of the item in the cart
 * @param {string} deliveryOption - The new deliveryOption of the item in the cart
 */
const patchCartItemDeliveryOption = async (req, res) => {
    try {
        const { id, deliveryOption } = req.body;

        const item = await Cart.findById(id).populate('deliveryOption');
        if (item) {
            item.deliveryOption = deliveryOption;
            await item.save();
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCartItems,
    getCartById,
    addCartItem,
    patchCartItem,
    deleteCartItem,
    putCartItem,
    patchCartItemDeliveryOption
}
