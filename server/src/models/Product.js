const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageName: {
        type: String,
        default: 'default.jpeg'
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
