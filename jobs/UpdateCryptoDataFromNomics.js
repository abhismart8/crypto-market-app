'use strict';

const updateCryptoFunction = () => {
    const cron = require('node-cron');
    const axios = require('axios');
    const Crypto = require('../models/CryptoCurrency');
    const History = require('../models/CryptoHistory');
    const constants = require('../config/constants');

    cron.schedule('*/10 * * * *', () => {
        const cryptoData = async () => {
            try {
                return await axios.get('https://api.nomics.com/v1/currencies/ticker?key='+constants.NOMICS_API_KEY);
            }catch(error) {
                console.error(error)
            }
        }

        var daysArray = ['1d', '7d', '30d', '365d', 'ytd'];
    
        const getCryptoData = async () => {
            var data = await cryptoData();
            if (data){
                let cryptoCurrencyData = data.data;

                var count = 0;
                for(let crypto of cryptoCurrencyData){
                    
                    if(typeof crypto == 'undefined' || !crypto){
                        break;
                    }

                    var historyArray = [];
                    for(let day of daysArray){
                        let history = {};
                        if(typeof crypto[day] != "undefined"){
                            history = crypto[day];
                        }
                        try{
                            if(typeof history.market_cap_change != 'undefined'){
                                history['market_cap'] = (parseInt(crypto.market_cap) + parseInt(history.market_cap_change)).toString();
                            }
                            if(typeof history.market_cap_change != 'undefined'){
                                history['market_cap'] = (parseInt(crypto.market_cap) + parseInt(history.market_cap_change)).toString();
                            }
                            if(typeof history.price_change != 'undefined'){
                                history['price'] = (parseInt(crypto.price) + parseInt(history.price_change)).toString();
                            }
                        }
                        catch(err){
                            console.log(err)
                        }
    
                        if(typeof history != "undefined" && history){
                            historyArray[day] = history;
                        }
                    }
                    
                    // history pushed in crypto
                    crypto['history'] = historyArray;
                    
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

                        // history pushed in crypto object
                        cryptoObject['history'] = historyArray;

                        // data json pushed in crypto object
                        cryptoObject['data_json'] = await createDataJSON(crypto);

                        var cryptoObjectData = await Crypto.findOne({ id: cryptoObject.id });

                        if(cryptoObjectData){
                            await Crypto.findOneAndUpdate({id:cryptoObject.id}, cryptoObject,
                            function (err, res) {
                                if (err){
                                    console.log(err)
                                }
                                else{
                                    console.log('crypto updated with id: '+cryptoObject.id);
                                }
                            });
                        }else{
                            const cryptoCurrencyResponse = new Crypto(cryptoObject);
                            cryptoCurrencyResponse.save();
                            console.log('crypto inserted with id: '+cryptoObject.id);
                        }

                        count++;
                    }
                    catch(err){
                        console.log('crypto updated failed with id: '+crypto.id);
                        console.log(err)
                    }
                }
    
                console.log('All '+count+' Crypto data updated successfully');
            }
        }

        const createDataJSON = async (data) => {
            try{
                data['all_time_high'] = data.high
                data['all_time_high_timestamp'] = data.high_timestamp;
                for(let day of daysArray){
                    delete data[day]
                }
                return data;
    
            }
            catch(err){
                console.log(err);
                return data;
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