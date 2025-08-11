const products = require('./data/products');
const cors = require("cors");


// import modules
express = require('express');
const allProduct = require('./data/products.js')

// initialize express
const app = express();

// use middleware
app.use(cors());
app.use(express.json());


// routes get all products
app.get('/products', (req, res) => {
  res.json(allProduct);
});

app.get('/products/:id', (req, res) => {
    const product = allProduct.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
