'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Payment.belongsTo(models.LoanProduct, { foreignKey: 'loan_product_id' });
            Payment.belongsTo(models.Customer, { foreignKey: 'customer_id' });
            Payment.hasMany(models.Document, { foreignKey: 'document_host_id' });
        }
    };
    //object relational mapping
    Payment.init({
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_product_id: {
            type: DataTypes.INTEGER,
        },
        customer_id: {
            type: DataTypes.INTEGER,
        },
        payment_date: {
            type: DataTypes.DATE,
        },
        principal_amount: {
            type: DataTypes.DECIMAL(15, 2)
        },
        loan_term: {
            type: DataTypes.STRING(15)
        },
        next_term_fee: {
            type: DataTypes.DECIMAL(15, 0),
        },
        amount_paid: {
            type: DataTypes.DECIMAL(18, 2),
        },
        remaining_balance: {
            type: DataTypes.DECIMAL(18, 2),
        },
        payment_status: {
            type: DataTypes.STRING(50),
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        timestamps: true,

        modelName: 'Payment',
    });
    return Payment;
};