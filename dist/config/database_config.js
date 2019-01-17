"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
class Config {
}
Config.dbName = process.env.POSTGRES_DB;
Config.dbPass = process.env.POSTGRES_PASSWORD;
Config.dbUser = process.env.POSTGRES_USER;
Config.dbConfig = {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    timezone: process.env.TZ,
    operatorsAliases: false,
    isolationLevel: 'READ COMMITTED',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
};
Config.sConnector = new Sequelize(Config.dbName, Config.dbUser, Config.dbPass, Config.dbConfig);
exports.Config = Config;
//# sourceMappingURL=database_config.js.map