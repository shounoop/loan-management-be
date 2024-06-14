'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Payment', {
            payment_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            loan_product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            payment_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            loan_term: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            principal_amount: {
                type: Sequelize.DECIMAL(15, 2),
            },
            next_term_fee: {
                type: Sequelize.DECIMAL(15, 0),
                allowNull: false,
            },
            amount_paid: {
                type: Sequelize.DECIMAL(18, 2),
                allowNull: false,
            },
            remaining_balance: {
                type: Sequelize.DECIMAL(18, 2),
                allowNull: false,
            },
            payment_status: {
                type: Sequelize.STRING(50),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Payment');
    }
};