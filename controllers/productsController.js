// older using array // import array of products from data/products.js
// const allProduct = require("../data/products.js");
// new using database // import products model because we will interact with the products collection in the mongodb database
const Products = require("../models/products.js");

// import shema validation for products
const { schemaProductParams,schemaProductBody } = require("../validations/produitVal.js");



// products api
// creating controllers for Get all products

/**
 * @disc Get all items in the products
 * @route GET /products
 * @access Public
 * @returns {Array} - The list of products
 */

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//  creating controllers for Get product by id

/**
 * @disc Get a product by id
 * @route GET /products/:id
 * @access Public
 * @returns {Object} - The product object
 * @param {string} id - The id of the product
 */

const getProductById = async (req, res) => {
  // Find the product by id
  const { error } = schemaProductParams.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // Find the product by id
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
}
// add all products 
const addProducts = async (req,res) => {
  try {
    const products = req.body;
    const data = new Products(products);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// export the controllers
module.exports = {
    getProducts,
    getProductById,
    addProducts
}
