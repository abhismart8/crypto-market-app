'use strict';

const insertCurrencyFunction = () => {
    const cron = require('node-cron');
    const axios = require('axios');
    const models = require('../models');
    var constants = require('../config/constants');

    const cryptoData = async () => {
    try {
        return await axios.get('https://v6.exchangerate-api.com/v6/8f7c173b500a477b13d4bca3/latest/'+constants.currentCurrency)
    } catch (error) {
            console.error(error)
        }
    }

    const getCryptoData = async () => {
        const data = await cryptoData();
        if (data) {
            let currencyData = data.data.conversion_rates;
            for(let currency in currencyData)
            {
                models.Currency.create({
                    currency_from: constants.currentCurrency,
                    currency_to: currency,
                    conversion_value: currencyData[currency]
                }).then(currency => {
                    console.log('Currency data inserted successfully');
                });
            }
        }
    }

    getCryptoData();
}

module.exports = {
    insertCurrency: insertCurrencyFunction()
};