const ProductModel = require('../models/Product')
const upload = require('../middlewares/uploadMiddleware');


// POST product
exports.createProduct = async (req, res) => {
  try {
    const { productName, price } = req.body;
    const imageName = req.file.filename; // Extract the filename from the uploaded file

    const newProduct = await ProductModel.create({ productName, price, imageName });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// GET product
exports.showProducts = async (req, res) => {
  try {
    const newProduct = await ProductModel.find()
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
