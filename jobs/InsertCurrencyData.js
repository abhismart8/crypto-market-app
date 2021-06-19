'use strict';

const insertCurrencyFunction = () => {
    const axios = require('axios');
    const Currency = require('../models/Currency');
    const constants = require('../config/constants');

    const cryptoData = async () => {
    try {
        return await axios.get('https://v6.exchangerate-api.com/v6/8f7c173b500a477b13d4bca3/latest/'+constants.CURRENT_CURRENCY)
    } catch (error) {
            console.error(error)
        }
    }

    const getCryptoData = async () => {
        const data = await cryptoData();
        if (data) 
        {
            let currencyData = data.data.conversion_rates;
            for(let currency in currencyData)
            {
                let currencyResponse = new Currency({
                    currency_from: constants.CURRENT_CURRENCY,
                    currency_to: currency,
                    conversion_value: currencyData[currency]
                })

                try
                {
                    currencyResponse.save()  
                }
                catch(err)
                {
                    console.log(err)
                }
            }

            console.log('Currency data inserted successfully')
        }
    }

    const checkIfDataAlreadyExists = async () => {
        try
        {
            let currency = await Currency.find()
            if(currency.length == 0)
            {
                getCryptoData();
            }
            else
            {
                console.log('currency data already exists')
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }

    checkIfDataAlreadyExists();
}

module.exports = {
    insertCurrency: insertCurrencyFunction()
};