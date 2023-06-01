const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    phoneNumber: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },

})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
