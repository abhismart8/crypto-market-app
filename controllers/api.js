exports.api = function(req, res, next) {
    const Crypto = require('../models/CryptoCurrency');
    const History = require('../models/CryptoHistory');
    const User = require('../models/User');
    const constants = require('../config/constants');
    
    const apiValidation = async () => {
        let apikey = req.query.apikey;
        let id = req.query.id;
        let version = req.params.version;

        if(typeof apikey == 'undefined' || apikey == null || apikey == ''){
            res.send({"success": false, "error": "Unauthorized", "message": "Missing authentication"});
        }

        if(typeof version == 'undefined' || version == null || version == ''){
            res.send({"success": false, "error": "Invalid version"})
        }

        try{
            const user = await User.findById(apikey);
            if(typeof user != 'undefined' && user){
                if(version == 'v1'){
                    getCryptoData(id);
                }
                else{
                    res.send({"success": false, "error": "Invalid version"})
                }
            }else{
                res.send({"success": false, "error": "Unauthorized", "message": "Missing authentication"});
            }
        }catch(error) {
            console.error(error)
        }
    };

    const allCryptoData = async () => {
        try{
            const crypto = await Crypto.find().select({ _id: 1, data_json: 1 });
            if(crypto.length > 0){
                return crypto;
            }
        }catch(error) {
            console.error(error)
        }
    }

    const singleCryptoData = async (id) => {
        try{
            if(typeof id === 'undefined' || id == null || id == ''){
                res.send({"success": false, "error": "Invalid crypto id"});
            }
            const crypto = await Crypto.find({"id": id}).select({ data_json: 1 });
            if(crypto){
                return crypto[0].data_json
            }
        }catch(error) {
            console.error(error)
        }
    }

    const getCryptoData = async (id) => {
        var data = null
        if(typeof id == 'undefined'){
            data = await allCryptoData();
        }else{
            data = await singleCryptoData(id);
        }
        
        if (data) {
            res.json(data);
        }
    }

    apiValidation();
}