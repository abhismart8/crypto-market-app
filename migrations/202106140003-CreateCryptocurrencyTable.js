'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Cryptocurrency', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            rank: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            symbol: {
                allowNull: false,
                type: Sequelize.STRING
            },
            logo_url: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            price_timestamp: {
                allowNull: false,
                type: Sequelize.DATE
            },
            circulating_supply: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            max_supply: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            market_cap: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            first_trade: {
                allowNull: false,
                type: Sequelize.DATE
            },
            first_order_book: {
                allowNull: false,
                type: Sequelize.DATE
            },
            all_time_high: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            all_time_high_timestamp: {
                allowNull: false,
                type: Sequelize.DATE
            },
            json_dump: {
                allowNull: true,
                type: Sequelize.JSON
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Cryptocurrency')
    }
}