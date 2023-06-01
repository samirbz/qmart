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
