// import modules

    // we need to import the express module to create our server and define our routes.
express = require('express');
const cors = require("cors");

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

// Routes
// we need to define the routes for the products API
// we will use the productRoutes defined in the routes/products.js file
// we need to mount the productRoutes on the /api/products path
// first argument is the path the second is the routes(the routes is defined in the productRoutes variable as routes.get)

// productRoutes
    // get all products api
app.use('/products', productRoutes);

    // get product by id api
app.use('/products/:id', productRoutes);

// cartRoutes
    // get all items in the cart api
app.use('/cart', cartRoutes);
    // get item by id in the cart api
app.use('/cart/:id', cartRoutes);
    // post a new item to the cart api
app.use('/cart', cartRoutes);
    // delete an item from the cart api
app.use('/cart', cartRoutes);
    // update the quantity of an item in the cart api
app.use('/cart', cartRoutes);



// run the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
