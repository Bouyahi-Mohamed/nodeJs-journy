// import express
const express = require("express");
// import joi
const Joi = require("joi");
// import Cart data
const products = require("../data/cart.js");

//create validation schema for cart
// we will use this schema to validate the cart data
// the cart data will be validated when we add a new item to the cart
// the cart data will be validated when we update an item in the cart

// post a new item to the cart
const schemaPost = Joi.object({
    product: Joi.string().trim().required(),
    quantity: Joi.number()
        .min(1)
        .max(100)
})

// patch an quantity of an item in the cart
const schemaPatch = Joi.object({
    id: Joi.string().trim().required(),
    quantity: Joi.number().min(1).max(100).required()
});

// put change all the item fields
const schemaPut = Joi.object({
    id: Joi.string().trim().required(),
    product: Joi.string().trim().required(),
    quantity: Joi.number()
        .min(1)
        .max(100)
        .required()
}); 

// delete an item from the cart
const schemaDelete = Joi.object({
    id: Joi.string().trim().required()
});

module.exports = {
    schemaDelete,
    schemaPost,
    schemaPatch,
    schemaPut
};
