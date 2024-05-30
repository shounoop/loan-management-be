'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Admin.hasMany(models.AdminActivityLog, { foreignKey: 'admin_id' });
            Admin.hasMany(models.AdminRole, { foreignKey: 'admin_id' });
        }
    };
    //object relational mapping
    Admin.init({
        username: {
            type: DataTypes.STRING(50),
        },
        password: {
            type: DataTypes.STRING(255),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
        last_login: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};