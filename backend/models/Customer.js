
const mongoose = require('mongoose');
const customerModel = mongoose.model('customer', {

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    phone: {
        type: String,
        require: true
    },

    billing_address: {
        type: String,
        require: true
    },

    shipping_address: {
        type: String,
        require: true
    },

})
module.exports = customerModel

