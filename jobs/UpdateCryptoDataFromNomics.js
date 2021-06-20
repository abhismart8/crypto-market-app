'use strict';

const updateCryptoFunction = () => {
    const cron = require('node-cron');
    const axios = require('axios');
    const Crypto = require('../models/CryptoCurrency');
    const History = require('../models/CryptoHistory');
    const constants = require('../config/constants');

    cron.schedule('*/5 * * * *', () => {
        const cryptoData = async () => {
            try {
                return await axios.get('https://api.nomics.com/v1/currencies/ticker?key='+constants.NOMICS_API_KEY)
            }catch(error) {
                console.error(error)
            }
        }
    
        const getCryptoData = async () => {
            const data = await cryptoData();
            if (data){
                let cryptoCurrencyData = data.data;
                let daysArray = ['1d', '7d', '30d', '365d', 'ytd'];
    
                for(let crypto of cryptoCurrencyData){
                    if(typeof crypto == 'undefined' || crypto == null || crypto == '' || crypto.length == 0){
                        break;
                    }

                    var cryptoCurrencyResponse = await Crypto.findOne({ id: crypto.id });
                    if(typeof cryptoHistoryResponse == 'undefined' || cryptoHistoryResponse == null || cryptoHistoryResponse == '' || cryptoHistoryResponse.length == 0){
                        break;
                    }
                    var cryptoHistoryResponse = await History.findOne({ crypto_id: crypto.id });
                    if(typeof cryptoHistoryResponse == 'undefined' || cryptoHistoryResponse == null || cryptoHistoryResponse == '' || cryptoHistoryResponse.length == 0){
                        cryptoHistoryResponse = {};
                    }
    
                    var historyArray = new Object();
                    for(let day of daysArray){
                        let history = {};
                        history = crypto.ytd;
                        if(day != 'ytd'){
                            history = crypto[day];
                        }
                        if(typeof history == 'undefined'){
                            break;
                        }
                        try{
                            if(typeof history.market_cap_change != 'undefined'){
                                history.market_cap = (parseInt(crypto.market_cap) + parseInt(history.market_cap_change)).toString();
                            }
                            if(typeof history.market_cap_change != 'undefined'){
                                history.market_cap = (parseInt(crypto.market_cap) + parseInt(history.market_cap_change)).toString();
                            }
                            if(typeof history.price_change != 'undefined'){
                                history.price = (parseInt(crypto.price) + parseInt(history.price_change)).toString();
                            }
    
                            history.crypto_id = crypto.id;
                            history.no_of_days = day;
    
                            // saving in db
                            if(typeof history.crypto_id != 'undefined' && typeof history.no_of_days != 'undefined'){
                                cryptoHistoryResponse = history;
                                cryptoHistoryResponse.save()
                            }
    
                            // removing crypto_id and no_of_days
                            delete history.crypto_id;
                            delete history.no_of_days;
                        }
                        catch(err){
                            console.log(err)
                        }
    
                        if(typeof history != 'undefined' && history.length > 0){
                            historyArray[day] = history;
                        }
                    }
    
                    if(historyArray.length > 0){
                        crypto.history = historyArray;
                    }
    
                    try{
                        var cryptoObject = {
                            id: crypto.id,
                            name: typeof crypto.name != 'undefined'? crypto.name : null,
                            symbol: typeof crypto.symbol != 'undefined'? crypto.symbol : null,
                            rank: typeof crypto.rank != 'undefined'? crypto.rank : null,
                            logo_url: typeof crypto.logo_url != 'undefined'? crypto.logo_url : null,
                            price: typeof crypto.price != 'undefined'? crypto.price : null,
                            price_timestamp: typeof crypto.price_timestamp != 'undefined'? crypto.price_timestamp : null,
                            circulating_supply: typeof crypto.circulating_supply != 'undefined'? crypto.max_supply : null,
                            max_supply: typeof crypto.max_supply != 'undefined'? crypto.max_supply : null,
                            market_cap: typeof crypto.market_cap != 'undefined'? crypto.market_cap : null,
                            first_trade: typeof crypto.first_trade != 'undefined'? crypto.first_trade : null,
                            first_order_book: typeof crypto.first_order_book != 'undefined'? crypto.first_order_book : null,
                            all_time_high: typeof crypto.high != 'undefined'? crypto.high : null,
                            all_time_high_timestamp: typeof crypto.high_timestamp != 'undefined'? crypto.high_timestamp : null,
                        };

                        if(await createDataJSON(crypto, historyArray)){
                            cryptoObject.data_json = await createDataJSON(crypto, historyArray);
                        }
                        
                        cryptoCurrencyResponse = cryptoObject;
                        cryptoCurrencyResponse.save()  
                    }
                    catch(err){
                        console.log(err)
                    }
                }
    
                console.log('Crypto data updated successfully')
            }
        }

        const createDataJSON = async (data, history) => {
            try{
                data.all_time_high = data.high
                data.all_time_high_timestamp = data.high_timestamp;
                for(let day of daysArray){
                    delete data[day]
                }
                data.history = history;
                return data;
    
            }
            catch(err){
                return false;
            }
        }
    
        const checkIfDataAlreadyExists = async () => {
            try{
                let crypto = await Crypto.find()
                if(crypto.length > 0){
                    getCryptoData();
                }
                else{
                    console.log('crypto data does not exists')
                }
            }
            catch(err){
                console.log(err)
            }
        }
    
        checkIfDataAlreadyExists();
    });
}

module.exports = {
    updateCurrency: updateCryptoFunction()
};