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
        const phoneNumber = req.query.phoneNumber;
        const orderItems = await OrderModel.find({ sellerPhoneNumber: phoneNumber });
        res.json(orderItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


