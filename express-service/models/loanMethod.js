'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanMethod extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanMethod.hasMany(models.LoanProductDetail, { foreignKey: 'loan_method_id' });
        }
    };
    //object relational mapping
    LoanMethod.init({
        loan_method_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_method_name: {
            type: DataTypes.STRING(100),
        },
        loan_method_desc: {
            type: DataTypes.TEXT,
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

        modelName: 'LoanMethod',
    });
    return LoanMethod;
};