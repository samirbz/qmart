const express = require('express')
const userController = require('../controllers/UsersController')
const router = express.Router()

router.post('/create', userController.createUser)

module.exports = router;