
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

})
module.exports = categoryModel

