import path from 'path';
import type { Sequelize as SequelizeType } from 'sequelize'
import { Sequelize } from 'sequelize';

/* https://stackoverflow.com/questions/51528780/typescript-check-typeof-against-custom-type */
const dbTypes = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake', 'oracle'] as const;
type DbTypes = (typeof dbTypes)[number];
const isDbType = (x: any): x is DbTypes => dbTypes.includes(x);

const dbName = process.env.DB_NAME || 'erp-default';
const dbUsername = process.env.DB_USERNAME || 'username';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbPort: number = Number.isNaN(process.env.DB_PORT) || !!process.env.DB_PORT
  ? 5432
  : Number.parseInt(process.env.DB_PORT);
const dbStorage = process.env.DB_STORAGE
  ? path.resolve(process.env.DB_STORAGE)
  : 'sqlite::memory:';
 /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
const dialect: DbTypes = isDbType(process.env.DB_TYPE)
  ? process.env.DB_TYPE
  : 'sqlite';
const dbURI: string | null | undefined = process.env.DB_URI;

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

const sequelizeURI = new Sequelize(dbURI || 'mysql://localhost:3306/database', {});

const sequelizeOptsGral = new Sequelize(
  {
    database: dbName,
    username: dbUsername,
    password: dbPassword,
    host: process.env.DB_HOST || 'localhost',
    port: dbPort,
    dialect,
  },
);

// Option 3: Passing parameters separately (other dialects)
export const sequelize: SequelizeType = dbURI ? sequelizeURI : {
  'sqlite': new Sequelize({ dialect, storage: dbStorage }),
  'mysql': sequelizeOptsGral,
  'postgres': sequelizeOptsGral,
  'mariadb': sequelizeOptsGral,
  'mssql': sequelizeOptsGral,
  'db2': sequelizeOptsGral,
  'snowflake': sequelizeOptsGral,
  'oracle': sequelizeOptsGral,
}[dialect];
