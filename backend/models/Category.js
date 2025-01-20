
const mongoose = require('mongoose');
const categoryModel = mongoose.model('category', {

    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },
    image_url: {
        type: String,
        require: true
    }

})
module.exports = categoryModel

