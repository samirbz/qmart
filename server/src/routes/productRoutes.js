const express = require('express')
const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadMiddleware')
const router = express.Router()

router.post('/create', upload.single('file'), productController.createProduct)
router.get('/list', productController.showProducts)

module.exports = router;
