'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanProductDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanProductDetail.belongsTo(models.LoanProduct, { foreignKey: 'loan_product_id' });
            LoanProductDetail.belongsTo(models.LoanMethod, { foreignKey: 'loan_method_id' });
            LoanProductDetail.belongsTo(models.LoanType, { foreignKey: 'loan_type_id' })
        }
    };
    //object relational mapping
    LoanProductDetail.init({
        loan_product_detail_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_product_id: {
            type: DataTypes.INTEGER,
        },
        loan_method_id: {
            type: DataTypes.INTEGER,
        },
        loan_type_id: {
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

        modelName: 'LoanProductDetail',
    });
    return LoanProductDetail;
};