
const mongoose = require('mongoose');
const orderModel = mongoose.model('order', {

    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: 'Pending'
    },
    shipping_fee: {
        type: Number,
        require: true,
        default: 0
    }, 
    tax: {
        type: Number,
        require: true,
        default: 0
    },

})
module.exports = orderModel

