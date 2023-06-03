const OrderModel = require('../models/Order')

// POST Order
exports.addOrder = async (req, res) => {
    try {
        const { buyerName, buyerPhoneNumber, productId, sellerPhoneNumber, imageName, price } = req.body;
        const newOrder = await OrderModel.create({ buyerName, buyerPhoneNumber, productId, sellerPhoneNumber, imageName, price });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET orders
exports.showOrder = async (req, res) => {
    try {
        const phoneNumber = req.query.sellerPhoneNumber;
        const orderItems = await OrderModel.find({ sellerPhoneNumber: phoneNumber });
        res.json(orderItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Remove order
exports.removeOrder = async (req, res) => {
    const itemId = req.params.id;
    try {
        const RemoveItem = await OrderModel.deleteOne({ _id: itemId });

        if (RemoveItem.RemoveCount === 0) {
            return res.status(404).json({ error: 'product item not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error removing orders', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


