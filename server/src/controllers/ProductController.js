const ProductModel = require('../models/Product')
const upload = require('../middlewares/uploadMiddleware');


// POST product
exports.createProduct = async (req, res) => {
  try {
    const { productName, price, phoneNumber, productDetail, businessName } = req.body;
    let imageName = 'default.png'; // Set the default image name

    if (req.file) {
      // If a file is uploaded, extract the filename from the uploaded file
      imageName = req.file.filename;
    }

    const newProduct = await ProductModel.create({ productName, price, imageName, phoneNumber, productDetail, businessName });

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

// DELETE products
exports.deleteProduct = async (req, res) => {
  const itemId = req.params.id;

  try {
    // Find and remove the cart item from the database based on productId
    const deletedItem = await ProductModel.deleteOne({ _id: itemId });

    if (deletedItem.deletedCount === 0) {
      return res.status(404).json({ error: 'product item not found' });
    }

    res.status(200).json({ message: 'Product item deleted successfully' });
  } catch (error) {
    console.error('Error deleting Product item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the Product item' });
  }
};

// UPdate data
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, price, productDetail, imageName } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { productName, price, productDetail, imageName },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};


// GET product state
exports.getProductState = async (req, res) => {
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
}