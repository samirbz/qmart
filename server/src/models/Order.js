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
        require: true,
        default: '0000000000'
    },
    imageName: {
        type: String,
        require: true,
        default: 'imagename'
    },
    price: {
        type: String,
        require: true,
        default: '00000'
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
