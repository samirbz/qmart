const ProductModel = require('../models/Product')
const upload = require('../middlewares/uploadMiddleware');


// POST product
exports.createProduct = async (req, res) => {
  try {
    const { productName, price, phoneNumber, productDetail } = req.body;
    let imageName = 'default.png'; // Set the default image name

    if (req.file) {
      // If a file is uploaded, extract the filename from the uploaded file
      imageName = req.file.filename;
    }

    const newProduct = await ProductModel.create({ productName, price, imageName, phoneNumber, productDetail });

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

// Get product details
exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch product details from MongoDB based on the productId
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

