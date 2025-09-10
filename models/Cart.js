const mongoose = require("mongoose");

// Define the cart schema
// we will use this schema to create the cart model
// the cart model will be used to interact with the cart collection in the mongodb database

const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
  quantity: { type: Number, required: true, min: 0 },
}, { timestamps: true });


// Create the cart model
// we will use this model to interact with the cart collection in the mongodb database
const Cart = mongoose.model("Cart", cartSchema);

// export the cart model
module.exports = Cart;
