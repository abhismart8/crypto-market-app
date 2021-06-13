'use strict';

module.exports = (sequelize, DataTypes) => {
    var Crypto = sequelize.define('Crypto', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        rank: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        symbol: {
            allowNull: false,
            type: DataTypes.STRING
        },
        logo_url: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        price_timestamp: {
            allowNull: false,
            type: DataTypes.DATE
        },
        circulating_supply: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        max_supply: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        market_cap: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        first_trade: {
            allowNull: false,
            type: DataTypes.DATE
        },
        first_order_book: {
            allowNull: false,
            type: DataTypes.DATE
        },
        all_time_high: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        all_time_high_timestamp: {
            allowNull: false,
            type: DataTypes.DATE
        },
        json_dump: {
            allowNull: true,
            type: DataTypes.JSON
        }
    });

    return Crypto;
}