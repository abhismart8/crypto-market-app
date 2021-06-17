'use strict';

const updateCurrencyFunction = () => {
    const cron = require('node-cron');
    const axios = require('axios');
    const mongoose = require('mongoose');
    const Currency = require('../models/Currency');
    var constants = require('../config/constants');

    cron.schedule('*/5 * * * * *', () => {
        const cryptoData = async () => {
        try {
            return await axios.get('https://v6.exchangerate-api.com/v6/8f7c173b500a477b13d4bca3/latest/'+constants.currentCurrency)
        } catch (error) {
                throw (err)
            }
        }
    
        const getCryptoData = async () => {
            const data = await cryptoData();
            if (data) {
                let currencyData = data.data.conversion_rates;
                for(let currency in currencyData)
                {
                    try
                    {
                        var currencyResponse = await Currency.findOne({ currency_from: constants.currentCurrency, currency_to: currency });
                        currencyResponse.conversion_value = currencyData[currency];
                        currencyResponse.save(function (err, res) {
                            if (err) throw (err);
                        });
                    }
                    catch(err)
                    {
                        throw (err)
                    }
                }

                console.log('Currency data updated successfully')
            }
        }
    
        const checkIfDataAlreadyExists = async () => {
            try
            {
                let currency = await Currency.find()
                if(currency.length > 0)
                {
                    getCryptoData();
                }
                else
                {
                    console.log('currency data does not exists')
                }
            }
            catch(err)
            {
                throw (err)
            }
        }
    
        checkIfDataAlreadyExists();
    });
}

module.exports = {
    updateCurrency: updateCurrencyFunction()
};