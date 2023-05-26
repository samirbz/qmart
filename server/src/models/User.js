const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

