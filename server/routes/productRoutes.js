const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router.post('/create', productController.createProduct)
router.get('/list', productController.showProducts)

module.exports = router;
