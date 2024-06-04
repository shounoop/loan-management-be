'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Admin', {
            admin_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            last_login: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Admin');
    }
};