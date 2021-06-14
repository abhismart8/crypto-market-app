'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Crypto_history', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            crypto_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            no_of_days: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            volume: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            volume_change: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            volume_change_pct: {
                allowNull: false,
                type: Sequelize.DECIMAL
            },
            market_cap: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            market_cap_change: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            market_cap_change_pct: {
                allowNull: false,
                type: Sequelize.DECIMAL
            },
            price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            price_change: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            price_change_pct: {
                allowNull: false,
                type: Sequelize.DECIMAL
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
        return queryInterface.dropTable('Crypto_history')
    }
}