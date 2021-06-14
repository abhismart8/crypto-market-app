'use strict';

module.exports = (sequelize, DataTypes) => {
    var Currency = sequelize.define('Currency', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        currency_from: {
            allowNull: false,
            type: DataTypes.STRING
        },
        currency_to: {
            allowNull: false,
            type: DataTypes.STRING
        },
        conversion_value: {
            allowNull: false,
            type: DataTypes.FLOAT
        }
    });

    return Currency;
}