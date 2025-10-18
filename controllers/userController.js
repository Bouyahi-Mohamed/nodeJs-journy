const user = require('../models/user');

//import schema validation for user 

const { userSchema } = require('../validations/user.js');

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
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    let existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send('User already exists.');

    // create new user
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        passwordHash: req.body.password,
        roles: req.body.roles
    });

    // save user to database

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
};

/**
 * @desc Login a user
 * @route POST /login
 * @access Public   
 * @returns {Object} Logged in user object
 */
const loginUser = async (req, res) => {
    // validate user data
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const existingUser = await user.findOne({ email: req.body.email });
    if (!existingUser) return res.status(400).send('Invalid email or password.');

    // check password
    const isValidPassword = await existingUser.comparePassword(req.body.password);
    if (!isValidPassword) return res.status(400).send('Invalid email or password.');

    res.status(200).json(existingUser);
};
/**
 * 
 */


// export the controllers
module.exports = {
    registerUser,
    loginUser
};