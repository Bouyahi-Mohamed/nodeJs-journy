// import express
const express = require("express");
// import joi
const Joi = require("joi");
// import User model
const User = require("../models/user.js");

// create validation schema for user
// we will use this schema to validate the user data
// the user data will be validated when we register a new user
// the user data will be validated when we update user information
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    roles: Joi.string().valid('user', 'admin')
});

// export the user validation schema
module.exports = {
    userSchema
};