const mongoose = require('mongoose')
const { Schema } = mongoose;

const Cryptocurrency = new Schema({
    rank: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    logo_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price_timestamp: {
        type: Date,
        required: true
    },
    circulating_supply: {
        type: Number,
        required: true
    },
    max_supply: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    first_trade: {
        type: Date,
        required: true
    },
    first_order_book: {
        type: Date,
        required: true
    },
    all_time_high: {
        type: Number,
        required: true
    },
    all_time_high_timestamp: {
        type: Date,
        required: true
    },
    json_dump: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('crypto', Cryptocurrency)