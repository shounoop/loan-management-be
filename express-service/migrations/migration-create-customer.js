'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Customer', {
            customer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            full_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            date_of_birth: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            identity_number: {
                type: Sequelize.STRING(20),
                unique: true,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            occupation: {
                type: Sequelize.STRING(100),
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Customer');
    }
};