const Product = require('../models/ProductModel')

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

//POST IMAGE
exports.uploadImage = (req, res) => {
    // Access the uploaded file details using req.file
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Perform additional operations with the uploaded file if needed
    // For example, you can save the file details to a database

    // Return a success response
    res.json({ message: 'File uploaded successfully' });
};