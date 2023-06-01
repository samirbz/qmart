const express = require('express')
const cartController = require('../controllers/CartController')
const router = express.Router()

router.get('/showCart', cartController.showCart)
router.post('/add', cartController.addToCart)
router.delete('/delete/:id', cartController.deleteCart)


module.exports = router;