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
            loan_method_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            loan_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            loan_product_name: {
                type: Sequelize.STRING(50),
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
            loan_product_desc: {
                type: DataTypes.TEXT
            },
            additional_notes: {
                type: Sequelize.TEXT
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
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('LoanProduct');
    }
};