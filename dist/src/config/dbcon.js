import "reflect-metadata";
import { getConnectionManager } from "typeorm";
import { User } from "../models/User";
export class DbConnector {
}
DbConnector.dbName = process.env.DBNAME;
DbConnector.dbPass = process.env.DBPASSWORD;
DbConnector.dbUser = process.env.DBUSER;
DbConnector.dbHost = process.env.DBHOST;
DbConnector.dbport = process.env.DBPORT;
DbConnector.connectionManager = getConnectionManager();
DbConnector.connection = DbConnector.connectionManager.create({
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
//# sourceMappingURL=dbcon.js.map