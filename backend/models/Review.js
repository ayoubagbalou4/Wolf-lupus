
const mongoose = require('mongoose');
const reviewModel = mongoose.model('review', {

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },

    comment: {
        type: String,
        require: true
    },

    status: {
        type: Boolean,
        require: true,
        default: false
    },

})
module.exports = reviewModel

