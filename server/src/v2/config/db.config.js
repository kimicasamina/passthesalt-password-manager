import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const dbConfig = {
  development: {
    url: process.env.MYSQL_URL,
    dialect: 'mysql',
  },
  production: {
    url: process.env.POSTGRES_URL,
    dialect: 'postgres',
  },
};

const isProduction = environment === 'production';
const config = isProduction ? dbConfig.production : dbConfig.development;

let sequelize;
if (isProduction) {
  sequelize = new Sequelize(config.url, {
    logging: false,
  });
} else {
  sequelize = new Sequelize(config.url, {
    logging: false,
  });
}

export default sequelize;
