const mongoose = require('mongoose')
const { Schema } = mongoose;

const CryptoHistory = new Schema({
    crypto_id: {
        type: String,
        required: true
    },
    no_of_days: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    volume_change: {
        type: Number,
        required: true
    },
    volume_change_pct: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    market_cap_change: {
        type: Number,
        required: true
    },
    market_cap_change_pct: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price_change: {
        type: Number,
        required: true
    },
    price_change_pct: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('cryptohistory', CryptoHistory)