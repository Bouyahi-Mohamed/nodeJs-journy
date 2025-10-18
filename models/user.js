// import mongoose to define a schema and model
const mongoose = require('mongoose');

// create the schema for users
// we will define the schema for the users collection in the mongodb database
// the schema will define the structure of the documents in the collection
// we will use this schema to create the users model
// the users model will be used to interact with the users collection in the mongodb database
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    roles: { type: String, enum: ['user', 'admin'], default: 'user' },
    token: { type: String }
}, { timestamps: true });

// create the users model
const User = mongoose.model('User', userSchema);

// export the users model
module.exports = User;