const path = require('path');
const { sequelize } = require('../config/db');
const dbname = process.env.DB_NAME || 'erp-default';

module.exports = {
  plugin: require('hapi-sequelizejs'),
  options: [
    {
      name: dbname,
      models: [
        path.resolve(path.join(__dirname, '..', 'models')),
      ],
      sequelize,
    },
  ],
};
