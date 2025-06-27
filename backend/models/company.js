const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company_logo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'companies',
    schema: 'public',
    timestamps: false,
  });

  Company.associate = (models) => {
    Company.hasMany(models.IPO, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
  };

  return Company;
};
