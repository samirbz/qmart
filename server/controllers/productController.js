const Product = require('../models/Product')

// POST product
exports.createProduct = async (req, res) => {
    try {
        const { productName, price } = req.body;
        const newProduct = await Product.create({ productName, price })
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

// GET product
exports.showProducts = async (req, res) => {
    try {
        const newProduct = await Product.find()
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

