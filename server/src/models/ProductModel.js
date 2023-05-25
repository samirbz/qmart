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

const Products = mongoose.model('Products', productSchema)
module.exports = Products