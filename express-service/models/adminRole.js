'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AdminRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AdminRole.belongsTo(models.Admin, { foreignKey: 'id' });
            AdminRole.belongsTo(models.Role, { foreignKey: 'id' });
        }
    };
    //object relational mapping
    AdminRole.init({
        admin_role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: true,

        modelName: 'AdminRole',
    });
    return AdminRole;
};