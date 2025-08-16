// import express
const express = require("express");
// import joi
const Joi = require("joi");
// import Cart data
const products = require("../data/cart.js");


const schemaPost = Joi.object({
    id: Joi.string().trim()
        .min(3)
        .max(50)
        .required(),

    image: Joi.string()
        .min(3)
        .max(1000)
        .required(),
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
        
    rating: Joi.object({
        stars: Joi.number()
            .min(0.0)
            .max(5.0)
            .required(),
        count: Joi.number()
            .integer()
            .min(0)
            .max(10000)
            .required()
    }).required(),

    priceCents: Joi.number()
        .integer()
        .min(0)
        .required(),

    description: Joi.string()
        .min(3)
        .max(1000)
        .required(),
    keywords: Joi.array()
        .items(Joi.string().min(1).max(100))
        .required(),
    quantity: Joi.number()
        .min(1)
        .max(100)
        .required()
})

const schemaDelete = Joi.object({
    id: Joi.string().trim().required()
});
const schemaPatch = Joi.object({
    id: Joi.string().trim().required(),
    quantity: Joi.number().min(1).max(100).required()
});

module.exports = {
    schemaDelete,
    schemaPost,
    schemaPatch
};
