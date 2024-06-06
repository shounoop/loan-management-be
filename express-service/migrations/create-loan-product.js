'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('LoanProduct', {
            loan_product_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            loan_product_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            interest_rate: {
                type: Sequelize.DECIMAL(5, 2),
                allowNull: false
            },
            minimum_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            maximum_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            minimum_term: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            maximum_term: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            repayment_schedule: {
                type: Sequelize.STRING(50),
            },
            eligibility_criteria: {
                type: Sequelize.TEXT,
            },
            product_description: {
                type: Sequelize.TEXT,
            },
            additional_notes: {
                type: Sequelize.TEXT
            },
            late_fee: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(50),
                allowNull: false
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
        await queryInterface.dropTable('LoanProduct');
    }
};