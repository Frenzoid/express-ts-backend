"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Tag_1 = require("../models/Tag");
const UploadedFile_1 = require("../models/UploadedFile");
class DbConnector {
}
DbConnector.dbName = process.env.DBNAME;
DbConnector.dbPass = process.env.DBPASSWORD;
DbConnector.dbUser = process.env.DBUSER;
DbConnector.dbHost = process.env.DBHOST;
DbConnector.dbport = process.env.DBPORT;
DbConnector.connectionManager = typeorm_1.getConnectionManager();
DbConnector.connection = DbConnector.connectionManager.create({
    type: 'postgres',
    port: Number(DbConnector.dbport),
    host: DbConnector.dbHost,
    username: DbConnector.dbUser,
    password: DbConnector.dbPass,
    database: DbConnector.dbName,
    entities: [
        User_1.User,
        Tag_1.Tag,
        UploadedFile_1.UploadedFile,
    ],
});
exports.DbConnector = DbConnector;
//# sourceMappingURL=dbcon.js.map