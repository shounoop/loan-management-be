'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Document extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Document.belongsTo(models.LoanProduct, { foreignKey: 'id' });
        }
    };
    //object relational mapping
    Document.init({
        loan_product_id: {
            type: DataTypes.INTEGER,
        },
        document_type: {
            type: DataTypes.STRING(50),
        },
        document_path: {
            type: DataTypes.STRING(255),
        },
    }, {
        sequelize,
        modelName: 'Document',
    });
    return Document;
};