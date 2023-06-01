const express = require('express')
const cartController = require('../controllers/CartController')
const router = express.Router()

router.post('/add', cartController.addToCart)
router.get('/showCart',cartController.showCart)

module.exports = router;