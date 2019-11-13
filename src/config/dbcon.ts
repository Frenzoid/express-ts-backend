import "reflect-metadata";
import { Connection, ConnectionManager, getConnectionManager } from "typeorm";
import { User } from "../models/User";

export class DbConnector {
  public static dbName: string = process.env.DBNAME;
  public static dbPass: string = process.env.DBPASSWORD;
  public static dbUser: string = process.env.DBUSER;
  public static dbHost: string = process.env.DBHOST;
  public static dbport: string = process.env.DBPORT;

  public static connectionManager: ConnectionManager = getConnectionManager();
  public static connection: Connection = DbConnector.connectionManager.create({
    type: "postgres",
    port: Number(DbConnector.dbport),
    host: DbConnector.dbHost,
    username: DbConnector.dbUser,
    password: DbConnector.dbPass,
    database: DbConnector.dbName,
    entities: [
      User,
    ],
  });
}