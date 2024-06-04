'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanType.hasMany(models.LoanProductType, { foreignKey: 'id' });
        }
    };
    //object relational mapping
    LoanType.init({
        loan_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_type_name: {
            type: DataTypes.STRING(50),
        },
        loan_type_desc: {
            type: DataTypes.STRING(255),
        },
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        modelName: 'LoanType',
    });
    return LoanType;
};