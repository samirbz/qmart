const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    buyerName: {
        type: String,
        require: true
    },
    buyerPhoneNumber: {
        type: String,
        require: true
    },
    sellerPhoneNumber: {
        type: String,
        require: true
    },
    imageName: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
