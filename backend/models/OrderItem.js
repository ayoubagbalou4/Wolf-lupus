
const mongoose = require('mongoose');
const orderItemModel = mongoose.model('orderItem', {

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },

    quantity: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

})
module.exports = orderItemModel

