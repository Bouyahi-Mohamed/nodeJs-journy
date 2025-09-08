const cart = [{
     
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    description: "Comfortable and breathable athletic socks perfect for sports and everyday wear.",
    keywords: [
      "socks",
      "sports",
      "apparel"
    ],
    quantity: 3

  },
{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127
      },
      priceCents: 2095,
      description: "Intermediate size basketball suitable for indoor and outdoor play.",
      keywords: [
        "sports",
        "basketballs"
      ],
      quantity: 1
    },
  
]

const addToCart = (item) => {
    cart.push(item)
}

const removeFromCart = (itemId) => {
    const index = cart.findIndex(cartItem => cartItem.id === itemId)
    if (index > -1) {
        cart.splice(index, 1)
    }
    return index > -1;
    
};

const viewCart = () => {
    return cart
}

module.exports = {
    addToCart,
    removeFromCart,
    viewCart
}