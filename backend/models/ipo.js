const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const IPO = sequelize.define('IPO', {
    ipo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'company_id'
      },
      onDelete: 'CASCADE'
    },
    price_band: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    open_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    issue_size: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    issue_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    listing_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Upcoming', 'Open', 'Closed', 'Listed'),
      allowNull: false,
    },
    ipo_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    listing_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    listing_gain: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
    },
    current_market_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    current_return: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
    }
  }, {
    tableName: 'ipos',
    schema: 'public',
    timestamps: false,
  });

  IPO.associate = (models) => {
    IPO.belongsTo(models.Company, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    IPO.hasMany(models.Document, {
      foreignKey: 'ipo_id',
      onDelete: 'CASCADE'
    });
  };

  return IPO;
};
