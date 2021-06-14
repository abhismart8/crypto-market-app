'use strict';

const updateCurrencyFunction = () => {
    const cron = require('node-cron');
    const axios = require('axios');
    const models = require('../models');
    var constants = require('../config/constants');

    cron.schedule('* * * * *', () => {
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
                    models.Currency.update(
                        { conversion_value: currencyData[currency] },
                        { where: [{ currency_from: constants.currentCurrency }, {currency_to: currency}] 
                    }).then(currency => {
                        //
                    });
                }
            }
        }
    
        getCryptoData();
    });
}

module.exports = {
    updateCurrency: updateCurrencyFunction()
};