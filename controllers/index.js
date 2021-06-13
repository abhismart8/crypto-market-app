    
exports.index = function(req, res, next) { 
    const axios = require('axios')

    const cryptoData = async () => {
    try {
        return await axios.get('https://api.nomics.com/v1/currencies/ticker?key=02ae7188466cc4acd02b0b613c4397ac7a085acb&ids=BTC,ETH,ADA,DOGE,DOT,UNI,SHIB')
    } catch (error) {
            console.error(error)
        }
    }

    const getCryptoData = async () => {
        const data = await cryptoData();
        if (data) {
            res.render('index', { title: 'Crypto Market App' , cryptocurrencies: data.data});
        }
    }

    getCryptoData();
}