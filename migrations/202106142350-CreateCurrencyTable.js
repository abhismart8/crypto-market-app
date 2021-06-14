'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Currency', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            currency_from: {
                allowNull: false,
                type: Sequelize.STRING
            },
            currency_to: {
                allowNull: false,
                type: Sequelize.STRING
            },
            conversion_value: {
                allowNull: false,
                type: Sequelize.FLOAT
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
        return queryInterface.dropTable('Currency')
    }
}