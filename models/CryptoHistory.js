const mongoose = require('mongoose');
const { Schema } = mongoose;

const CryptoHistory = new Schema({
    crypto_id: {
        type: String,
        required: true
    },
    no_of_days: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: false
    },
    volume_change: {
        type: String,
        required: false
    },
    volume_change_pct: {
        type: String,
        required: false
    },
    market_cap: {
        type: String,
        required: false
    },
    market_cap_change: {
        type: String,
        required: false
    },
    market_cap_change_pct: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    price_change: {
        type: String,
        required: false
    },
    price_change_pct: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('cryptohistory', CryptoHistory);