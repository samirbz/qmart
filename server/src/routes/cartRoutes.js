const express = require('express')
const cartController = require('../controllers/CartController')
const router = express.Router()

router.post('/add', cartController.addToCart)

module.exports = router;