const mongoose = require('mongoose');
require('dotenv').config();

var db = 'mongodb://localhost/crypto_market_app';
if(typeof process.env.ENV_NAME != 'undefined' && process.env.ENV_NAME == 'production'){
    console.log(process.env.ENV_NAME, 'yesyesyes');
    db = 'mongodb://cryptomarketapp88/crypto_market_app';
}

if(process.env.MONGODB_URI){
    db = process.env.MONGODB_URI;
}

module.exports = async () => {
    await mongoose.connect(db, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`,
        );
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    });
    return mongoose;
};