'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Document', {
            document_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            loan_product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            document_type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            document_path: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('Document');
    }
};