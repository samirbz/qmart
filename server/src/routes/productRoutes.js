const express = require('express')
const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadMiddleware')
const router = express.Router()

router.post('/create', productController.createProduct)
router.get('/list', productController.showProducts)
router.post('/api/upload', upload.single('file'),productController.uploadImage)

module.exports = router;
