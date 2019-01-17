import * as Sequelize from 'sequelize';

export class Config {
  public static dbName: string = process.env.POSTGRES_DB;
  public static dbPass: string = process.env.POSTGRES_PASSWORD;
  public static dbUser: string = process.env.POSTGRES_USER;

  public static dbConfig: any = {
    host: process.env.POSTGRES_HOST, // Docker's Host
    dialect: 'postgres',             // Type of database
    timezone: process.env.TZ,        // Database Timeformat
    operatorsAliases: false,
    isolationLevel: 'READ COMMITTED', // Needs this to lock transactions
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  };

  public static sConnector = new Sequelize(Config.dbName, Config.dbUser, Config.dbPass, Config.dbConfig);

}