'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Role', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            operation: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            permission: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },

            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Role');
    }
};