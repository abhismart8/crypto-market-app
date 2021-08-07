const axios = require('axios');
const Crypto = require('../models/CryptoCurrency');
const History = require('../models/CryptoHistory');
const Currency = require('../models/Currency');

exports.index = function(req, res, next) { 
    
    const cryptoData = async () => {
        try {
            var cryptoArray = new Array();
            var cryptoData = await Crypto.find({rank: {$gte:1}}).select({ data_json: 1 }).sort([['rank','ascending']]).limit(30);
            if(cryptoData.length > 0){
                for(crypto of cryptoData){
                    if(crypto && typeof crypto.data_json != 'undefined'){
                        cryptoArray.push(crypto.data_json);
                    }
                }
                return cryptoArray;
            } 
        }catch(error) {
            console.error(error)
        }
    }

    const getCryptoData = async () => {
        let currency = await Currency.find({"currency_from": "USD", "currency_to": "INR"});
        const data = await cryptoData();
        if (data && currency.length > 0) {
            res.render('index', { title: 'Crypto Market App', cryptocurrencies: data, currency: currency[0].conversion_value});
        }
    }

    getCryptoData();
}

exports.getData = function(req, res, next) {
    var rankVar = parseInt(req.body.rank);
    const cryptoData = async () => {
        try {
            var cryptoArray = new Array();
            var cryptoData = await Crypto.find({rank: { $gt: rankVar}}).select({ data_json: 1 }).limit(10);
            // console.log(cryptoData);
            if(cryptoData.length > 0){
                for(crypto of cryptoData){
                    // if(crypto && typeof crypto.data_json != 'undefined'){
                        cryptoArray.push(crypto.data_json);
                    // }
                }
                return cryptoArray;
            }
            else{
                console.log('no data found')
            }
        }catch(error) {
            console.error(error)
        }
    }

    const getCryptoData = async () => {
        let currency = await Currency.find({"currency_from": "USD", "currency_to": "INR"});
        const data = await cryptoData();
        if (data && currency.length > 0) {
            res.send({ cryptocurrencies: data, currency: currency[0].conversion_value});
        }
    }

    getCryptoData();
}