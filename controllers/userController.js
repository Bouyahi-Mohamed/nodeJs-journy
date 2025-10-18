const user = require('../models/user');

//import schema validation for user 

const { registerUserSchema,loginUserSchema } = require('../validations/user.js');

//import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// user api
// creating controllers for Register a new user
/**
 * @desc Register a new user
 * @route POST /register
 * @access Public
 * @returns {Object} Newly created user object
 */
const registerUser = async (req, res) => {
    // validate user data
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    let existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send('User already exists.');

    // hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });

    // save user to database

    const savedUser = await newUser.save();
// token generation can be added here for authentication
    const token = null; // Placeholder for token generation logic

    res.status(201).json({ user: savedUser, token });
    
    
};

/**
 * @desc Login a user
 * @route POST /login
 * @access Public   
 * @returns {Object} Logged in user object
 */
const loginUser = async (req, res) => {
    // validate user data
    const { error } = loginUserSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const existingUser = await user.findOne({ username: req.body.username });
    if (!existingUser) return res.status(401).send('Invalid username or password.');

    // check password using bcrypt to compare hashed password
    const isValidPassword = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isValidPassword) return res.status(400).send('Invalid username or password.');

    // generate token can be added here for authentication
    const token = null; // Placeholder for token generation logic

    res.status(200).json({ user: existingUser, token });
};
/**
 * 
 */


// export the controllers
module.exports = {
    registerUser,
    loginUser
};