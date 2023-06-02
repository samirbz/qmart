const CartModel = require('../models/Cart')

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, phoneNumber } = req.body;

        // Check if the item already exists in the database
        const existingCartItem = await CartModel.findOne({ productId, phoneNumber });

        if (existingCartItem) {
            // Item already exists, send a message
            return res.status(400).json({ message: 'Item already exists in the cart' });
        }

        // Item doesn't exist, add it to the cart
        const newCart = await CartModel.create({ productId, phoneNumber });
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
        const cartItems = await CartModel.find({ phoneNumber: phoneNumber });
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete cart items
exports.deleteCart = async (req, res) => {
    const itemId = req.params.id;

    try {
        // Find and remove the cart item from the database based on productId
        const deletedItem = await CartModel.deleteOne({ productId: itemId });

        if (deletedItem.deletedCount === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the cart item' });
    }
};

