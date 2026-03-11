import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    logging: false,
    dialectOptions: {
        ssl: true,
        rejectUnauthorized: false,
        connectionTimeoutMillis: 30000,
        query_timeout: 30000,
        keepAlive: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
