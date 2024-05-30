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
            },
            amount_paid: {
                type: Sequelize.DECIMAL(18, 2),
                allowNull: false,
            },
            remaining_balance: {
                type: Sequelize.DECIMAL(18, 2),
                allowNull: false,
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
        await queryInterface.dropTable('Payment');
    }
};