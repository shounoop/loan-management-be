'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AdminActivityLog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AdminActivityLog.belongsTo(models.Admin, { foreignKey: 'admin_id' });
        }
    };
    //object relational mapping
    AdminActivityLog.init({
        admin_id: {
            type: DataTypes.INTEGER,
        },
        activity_type: {
            type: DataTypes.STRING(50),
        },
        activity_desc: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'AdminActivityLog',
    });
    return AdminActivityLog;
};