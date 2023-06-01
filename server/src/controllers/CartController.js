const cartModel = require('../models/Cart')

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, phoneNumber } = req.body;
        const newCart = await cartModel.create({ productId, phoneNumber })
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Show cart items for a specific phone number
exports.showCart = async (req, res) => {
    try {
        const phoneNumber = req.query.phoneNumber;
        const cartItems = await cartModel.find({ phoneNumber: phoneNumber });
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};