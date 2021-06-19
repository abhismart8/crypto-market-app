const mongoose = require('mongoose');
const { Schema } = mongoose;

const Currency = new Schema({
    currency_from: {
        type: String,
        required: true
    },
    currency_to: {
        type: String,
        required: true
    },
    conversion_value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('currency', Currency);