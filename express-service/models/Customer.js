'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasMany(models.Payment, { foreignKey: 'customer_id' });
        }
    };
    //object relational mapping
    Customer.init({
        customer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        full_name: {
            type: DataTypes.STRING(50),
        },
        date_of_birth: {
            type: DataTypes.DATE,
        },
        gender: {
            type: DataTypes.STRING(10),
        },
        identity_number: {
            type: DataTypes.STRING(20),
        },
        address: {
            type: DataTypes.STRING(255),
        },
        phone_number: {
            type: DataTypes.STRING(15),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        occupation: {
            type: DataTypes.STRING(100),
        },
        customer_status: {
            type: DataTypes.STRING(20)
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
        modelName: 'Customer'
    });
    return Customer;
};