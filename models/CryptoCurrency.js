const mongoose = require('mongoose');
const { Schema } = mongoose;

const CryptoCurrency = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    symbol: {
        type: String,
        required: false
    },
    rank: {
        type: String,
        required: false
    },
    logo_url: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    price_timestamp: {
        type: String,
        required: false
    },
    circulating_supply: {
        type: String,
        required: false
    },
    max_supply: {
        type: String,
        required: false
    },
    market_cap: {
        type: String,
        required: false
    },
    first_trade: {
        type: String,
        required: false
    },
    first_order_book: {
        type: String,
        required: false
    },
    all_time_high: {
        type: String,
        required: false
    },
    all_time_high_timestamp: {
        type: String,
        required: false
    },
    data_json: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('crypto', CryptoCurrency);
