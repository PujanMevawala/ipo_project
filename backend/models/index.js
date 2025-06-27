const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Company = require('./company')(sequelize, Sequelize.DataTypes);
db.IPO = require('./ipo')(sequelize, Sequelize.DataTypes);
db.Document = require('./document')(sequelize, Sequelize.DataTypes);

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db; 