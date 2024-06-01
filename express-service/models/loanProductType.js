'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanProductType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanProductType.belongsTo(models.LoanType, { foreignKey: 'id' });
            LoanProductType.belongsTo(models.LoanProduct, { foreignKey: 'id' });
        }
    };
    //object relational mapping
    LoanProductType.init({
        loan_type_id: {
            type: DataTypes.INTEGER,
        },
        loan_product_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'LoanProductType',
    });
    return LoanProductType;
};