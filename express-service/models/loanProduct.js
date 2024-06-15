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
            LoanProduct.belongsTo(models.LoanType, { foreignKey: 'loan_type_id', targetKey: 'loan_type_id', as: 'ProductType' });
            LoanProduct.belongsTo(models.LoanMethod, { foreignKey: 'loan_method_id', targetKey: 'loan_method_id', as: 'ProductMethod' });
        }
    };
    //object relational mapping
    LoanProduct.init({
        loan_product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_method_id: {
            type: DataTypes.INTEGER,
        },
        loan_type_id: {
            type: DataTypes.INTEGER,
        },
        loan_product_name: {
            type: DataTypes.STRING(50),
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
            type: DataTypes.INTEGER,
        },
        eligibility_criteria: {
            type: DataTypes.TEXT
        },
        loan_product_desc: {
            type: DataTypes.TEXT
        },
        additional_notes: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.INTEGER,
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

        modelName: 'LoanProduct',
    });
    return LoanProduct;
};