'use strict';

module.exports = (sequelize, DataTypes) => {
    var CryptoHistory = sequelize.define('CryptoHistory', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        crypto_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        no_of_days: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        volume: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        volume_change: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        volume_change_pct: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        market_cap: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        market_cap_change: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        market_cap_change_pct: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        price_change: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        price_change_pct: {
            allowNull: false,
            type: DataTypes.DECIMAL
        }
    });

    return CryptoHistory;
}