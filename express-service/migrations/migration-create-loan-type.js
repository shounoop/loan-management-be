'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('LoanType', {
            loan_type_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            loan_type_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            loan_type_desc: {
                type: Sequelize.STRING(255),
            },
            interest_rate: {
                type: Sequelize.DECIMAL(5, 2),
                allowNull: false,
            },
            late_interest_fee: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            },
            prepay_interest_fee: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
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
        await queryInterface.dropTable('LoanType');
    }
};