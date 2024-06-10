'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanProduct.hasMany(models.Payment, { foreignKey: 'loan_product_id' });
            LoanProduct.hasMany(models.Document, { foreignKey: 'document_host_id' });
            LoanProduct.hasMany(models.LoanProductDetail, { foreignKey: 'loan_product_id' });
        }
    };
    //object relational mapping
    LoanProduct.init({
        loan_product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_product_name: {
            type: DataTypes.STRING(50),
        },
        interest_rate: {
            type: DataTypes.DECIMAL(5, 2)
        },
        minimum_amount: {
            type: DataTypes.DECIMAL(15, 2),
        },
        maximum_amount: {
            type: DataTypes.DECIMAL(15, 2),
        },
        minimum_term: {
            type: DataTypes.INTEGER,
        },
        maximum_term: {
            type: DataTypes.INTEGER,
        },
        repayment_schedule: {
            type: DataTypes.STRING(50),
        },
        eligibility_criteria: {
            type: DataTypes.TEXT
        },
        product_description: {
            type: DataTypes.TEXT
        },
        additional_notes: {
            type: DataTypes.TEXT
        },
        late_fee: {
            type: DataTypes.DECIMAL(15, 2),
        },
        status: {
            type: DataTypes.STRING(50),
        },
    }, {
        sequelize,
        timestamps: true,

        modelName: 'LoanProduct',
    });
    return LoanProduct;
};