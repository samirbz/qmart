const express = require('express')
const orderController = require('../controllers/OrderController')
const router = express.Router()

router.post('/add', orderController.addOrder)
router.get('/show', orderController.showOrder)

module.exports = router;