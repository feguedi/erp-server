const { Sequelize } = require('sequelize');

/* https://stackoverflow.com/questions/51528780/typescript-check-typeof-against-custom-type */
const dbTypes = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake', 'oracle'] as const;
type DbTypes = (typeof dbTypes)[number];
const isDbType = (x: any): x is DbTypes => dbTypes.includes(x);

const dbName = process.env.DB_NAME || 'erp-default';
const dbUsername = process.env.DB_USERNAME || 'username';
const dbPassword = process.env.DB_PASSWORD || 'password';
 /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
const dialect: DbTypes = isDbType(process.env.DB_TYPE)
  ? process.env.DB_TYPE
  : 'sqlite';

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
exports.sequelize = new Sequelize(
  dbname,
  dbUsername,
  dbPassword,
  {
    host: process.env.DB_HOST || 'http://localhost',
    dialect,
  },
);
