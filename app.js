// import modules

    // we need to import the express module to create our server and define our routes.
express = require('express');
const cors = require("cors");

//import mongoose to connect to mongodb
const mongoose = require('mongoose');

    // defind the routes of api products
const productRoutes = require('./routes/products.js');
    // define the routes of api cart
const cartRoutes = require('./routes/cart.js');

// initialize express
const app = express();

// use middleware
    // middleware for run the api local in browser
app.use(cors());
    // middleware for parsing json request body
app.use(express.json());

// connect to mongodb
// we need to connect to the mongodb database using mongoose
// we will use the mongoose.connect() method to connect to the database
// we will connect to a local mongodb database named ecommerce
async function main () {
  await mongoose.connect('mongodb://localhost:27017/ecommerce')
}
try {
  main();
  console.log('Connected to MongoDB...');
} catch (err) {
  console.log(err);
}
// Routes
// we need to define the routes for the products API
// we will use the productRoutes defined in the routes/products.js file
// we need to mount the productRoutes on the /api/products path
// first argument is the path the second is the routes(the routes is defined in the productRoutes variable as routes.get)

// productRoutes
app.use('/products', productRoutes);



// cartRoutes
app.use('/cart', cartRoutes);



// run the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
