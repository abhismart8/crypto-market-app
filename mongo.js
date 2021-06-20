const mongoose = require('mongoose');

module.exports = async (db) => {
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