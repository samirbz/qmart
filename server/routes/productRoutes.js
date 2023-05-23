const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router.post('/product', productController.createProduct)
router.get('/products', productController.showProducts)

module.exports = router;
