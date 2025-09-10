// import mongoose to define a schema and model
const mongoose = require('mongoose');

// create the schema for products
// we will define the schema for the products collection in the mongodb database
// the schema will define the structure of the documents in the collection
// we will use this schema to create the products model
// the products model will be used to interact with the products collection in the mongodb database
const productsSchema = new mongoose.Schema({

  image: { type: String, required: true, default: "https://via.placeholder.com/150" },
  name: { type: String, required: true },
  rating: {
    stars: { type: Number, required: true, min: 0, max: 5 },
    count: { type: Number, required: true, min: 0 }
  },
  priceCents: { type: Number, required: true, min: 0 },
  description: { type: String, required: true , minlength: 10, maxlength: 500 },
  keywords: [{ type: String, required: true, minlength: 3, maxlength: 10 }],
    
},{timestamps:true});
 

// create the products model
const Products = mongoose.model('Products', productsSchema);

// export the products model
module.exports = Products;

