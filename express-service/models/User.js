'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.UserActivityLog, { foreignKey: 'user_id' });
            User.hasMany(models.UserRole, { foreignKey: 'user_id' });
        }
    };
    //object relational mapping
    User.init({
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
        },
        password: {
            type: DataTypes.STRING(255),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        last_login: {
            type: DataTypes.DATE,
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
        modelName: 'User',
    });
    return User;
};