
const mongoose = require('mongoose');
const productModel = mongoose.model('product', {

    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    sizes: [
        {
            size: { type: String, required: true },
            price: { type: Number, required: true }
        },
    ],

    stock_quantity: {
        type: Number,
        require: true
    },

    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },

    image_url: {
        type: String,
        require: true
    },

})
module.exports = productModel

