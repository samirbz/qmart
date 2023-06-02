const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageName: {
        type: String,
    },
    productDetail: {
        type: String,
    },
    businessName: {
        type: String,
        require: true
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
