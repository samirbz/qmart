const express = require('express')
const productController = require('../controllers/ProductController')
const upload = require('../middlewares/uploadMiddleware')
const router = express.Router()

router.post('/create', upload.single('file'), productController.createProduct)
router.get('/list', productController.showProducts)
router.get('/list/:id', productController.getProductState)
router.get('/detail/:id', productController.getProductDetail)
router.delete('/delete/:id', productController.deleteProduct)
router.patch('/update/:id', upload.single('file'), productController.updateProduct)

module.exports = router;
