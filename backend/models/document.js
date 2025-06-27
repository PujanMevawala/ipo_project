const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ipos',
        key: 'ipo_id'
      },
      onDelete: 'CASCADE'
    },
    rhp_pdf: {
      type: DataTypes.STRING(255), // file path or URL
      allowNull: true,
    },
    drhp_pdf: {
      type: DataTypes.STRING(255), // file path or URL
      allowNull: true,
    },
  }, {
    tableName: 'documents',
    schema: 'public',
    timestamps: false,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.IPO, {
      foreignKey: 'ipo_id',
      onDelete: 'CASCADE'
    });
  };

  return Document;
};
