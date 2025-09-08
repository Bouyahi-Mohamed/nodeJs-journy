// import array of products from data/products.js
const allProduct = require("../data/products.js");
// import shema validation for products
const { schemaProductParams,schemaProductBody } = require("../validations/produitVal.js");



// products api
// creating controllers for Get all products

/**
 * @disc Get all items in the products
 */

const getProducts =   (req, res) => {
  res.json(allProduct);
}

//  creating controllers for Get product by id

/**
 * @disc Get a product by id
 * @param {string} id - The id of the product
 */

const getProductById = (req, res) => {
  // Find the product by id
  const { error } = schemaProductParams.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // Find the product by id
  const product = allProduct.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
}
module.exports = {
    getProducts,
    getProductById
}
