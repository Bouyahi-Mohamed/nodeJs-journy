// import express
const express = require("express");
// import joi
const Joi = require("joi");
// import Produit data
const products = require("../data/products.js");

const schemaProductParams = Joi.object({
    id: Joi.string().trim()
        .min(3)
        .max(50)
        .required(),
})

const schemaProductBody = Joi.object({
    name: Joi.string().trim()
        .min(3)
        .max(100)
        .required(),
    image: Joi.string().trim()
        .uri()
        .min(3)
        .max(1000)
        .required(),
    rating: {
        stars: Joi.number()
            .min(0.0)
            .max(5.0)
            .required(),
        count: Joi.number()
            .integer()
            .min(0)
            .max(10000)
            .required()
    },
    priceCents: Joi.number()
        .integer()
        .min(0)
        .required(),
    description: Joi.string().trim()
        .min(3)
        .max(1000)
        .required()
})

module.exports = {
    schemaProductParams,
    schemaProductBody
}
